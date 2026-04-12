# KossJS Python 接口封装使用文档

> [!TIP]
> 本文档介绍 KossJS 的 Python 接口封装 ***kossjs_interface.py***。

## 0. 安装说明

### 0.1 系统要求

1. Python 3.11 及以上版本
2. KossJS 动态库文件：
   - Windows 平台：***kossjs.dll***
   - macOS 平台：***libkossjs.dylib***
   - Linux 平台：***libkossjs.so***

### 0.2 安装步骤

1. 将动态库文件放置在项目目录中
2. 将 ***kossjs_interface.py*** 复制到项目目录

---

## 1. 模块概述

- **核心类**：***KossJS***
- **依赖**：***ctypes***、***json***、***pathlib*** 等标准库
- **功能**：
  - 创建 JS 实例（支持模块加载）
  - 执行 JavaScript 代码
  - 全局变量注入
  - 注册原生函数
  - Fetch API 调用

---

## 2. ***KossJS*** 类

### 2.1 初始化

```python
koss = KossJS(lib_path: str | None = None, with_modules: bool = False, root_dir: str | None = None)
```

- **参数**:
  - ***lib_path***: 动态库路径。若为 ***None***，根据操作系统自动选择默认路径
  - ***with_modules***: 是否启用模块加载（默认 ***False***）
  - ***root_dir***: 模块解析的根目录（默认当前目录）

### 2.2 执行代码

#### ***eval(code: str) -> str***

执行 JavaScript 代码并返回结果。

```python
result = koss.eval("1 + 2")
print(result)  # 输出: 3
```

#### ***run_file(path: str) -> str***

执行 JavaScript 文件。

```python
result = koss.run_file("./script.js")
```

#### ***run_module(path: str) -> str***

以 ES Module 方式执行 JavaScript 文件。

```python
result = koss.run_module("./module.mjs")
```

#### ***run_string(code: str) -> str***

执行 JavaScript 代码字符串（与 ***eval*** 相同）。

```python
result = koss.run_string("console.log('Hello')")
```

#### ***run_module_string(code: str) -> str***

以 ES Module 方式执行代码字符串。

```python
result = koss.run_module_string('''
import { add } from "./math.mjs";
add(1, 2);
''')
```

### 2.3 全局变量

#### ***set_global(name: str, value: Any) -> None***

设置全局变量。支持的类型：
- ***str*** → 全局字符串
- ***int/float*** → 全局数字
- ***bool*** → 全局布尔值

```python
koss.set_global("myVar", "Hello")
koss.set_global("count", 100)
koss.set_global("isReady", True)
```

### 2.4 原生函数注册

#### ***register_function(name: str, func: Callable[..., Any]) -> None***

将 Python 函数注册为 JavaScript 可调用。

```python
def add(a, b):
    return str(int(a) + int(b))

koss.register_function("add", add)
result = koss.eval("add(10, 20)")
print(result)  # 输出: 30
```

### 2.5 资源管理

#### ***destroy() -> None***

销毁 JS 实例并释放内存。

```python
koss.destroy()
```

##### 上下文管理器支持

```python
with KossJS() as koss:
    result = koss.eval("1 + 1")
    print(result)
# 自动销毁
```

### 2.6 其他方法

#### ***version() -> str***

获取 KossJS 版本。

```python
print(koss.version())  # 输出: 0.1.0-dev.2
```

---

## 3. 异常处理

### JsError

当 JavaScript 代码执行抛出错误时，会引发 ***JsError*** 异常。

```python
from kossjs_interface import KossJS, JsError

try:
    koss.eval("throw new Error('test error')")
except JsError as e:
    print(f"JS Error: {e}")
```

---

## 4. 使用示例

### 4.1 基本用法

```python
from kossjs_interface import KossJS

with KossJS() as koss:
    # 基本计算
    result = koss.eval("1 + 2 * 3")
    print(result)  # 输出: 7
    
    # 箭头函数
    code = "(a, b) => a + b"
    koss.set_global("add", koss.eval(code))
    result = koss.eval("add(5, 3)")
    print(result)  # 输出: 8
    
    # 对象操作
    code = """
    const person = { name: "John", age: 30 };
    person.name;
    """
    result = koss.eval(code)
    print(result)  # 输出: John
```

### 4.2 使用 Fetch API

```python
import time
from kossjs_interface import KossJS

with KossJS() as koss:
    # 异步 Fetch 请求
    code = '''
    (async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return await response.json();
    })();
    '''
    result = koss.eval(code)
    print(result)
```

### 4.3 使用 Node.js 模块

```python
from kossjs_interface import KossJS

with KossJS() as koss:
    # 使用路径模块
    code = '''
    const path = require("path");
    path.join("/home", "user", "file.txt");
    '''
    result = koss.eval(code)
    print(result)  # 输出: /home/user/file.txt
    
    # 使用 fs 模块
    code = '''
    const fs = require("fs");
    fs.existsSync("/tmp");
    '''
    result = koss.eval(code)
    print(result)  # 输出: true 或 false
```

### 4.4 使用 Fetch API (直接调用 Rust 实现)

```python
import json
from kossjs_interface import KossJS

with KossJS() as koss:
    # 直接调用 Rust fetch 实现
    request_json = json.dumps({
        "url": "https://api.github.com/users/github",
        "method": "GET",
        "headers": {
            "User-Agent": "KossJS/0.1.0"
        }
    })
    
    # 使用 koss_fetch 需要先注册
    # 或者直接调用 fetch polyfill
    code = '''
    fetch("https://api.github.com/users/github")
      .then(response => response.json())
      .then(data => console.log("Login:", data.login))
    '''
    koss.eval(code)
    time.sleep(2)
```

### 4.5 注册原生函数

```python
from kossjs_interface import KossJS

def python_add(a, b):
    return str(int(a) + int(b))

def python_read_file(filename):
    try:
        with open(filename, 'r') as f:
            return f.read()
    except Exception as e:
        return str(e)

with KossJS() as koss:
    koss.register_function("python_add", python_add)
    koss.register_function("readFile", python_read_file)
    
    result = koss.eval("python_add(10, 20)")
    print(result)  # 输出: 30
    
    result = koss.eval("readFile('test.txt')")
    print(result)
```

---

## 5. 内存管理

### 回调函数引用管理

每次调用 ***register_function*** 时，若提供了回调函数，会通过 ***ctypes.CFUNCTYPE*** 创建一个 C 可调用对象。

Python 接口通过以下方式管理这些引用：
- 回调对象被保存在 ***self._callbacks*** 列表中
- 这些引用会随着 ***KossJS*** 实例一起被 Python 垃圾回收器自动清理
- 无需手动干预或调用额外的清理方法

---

## 6. 注意事项

1. **库路径**：若自动猜测失败，需显式传入正确路径。
2. **返回值**：所有执行方法返回字符串结果，调用方需自行解析。
3. **异常处理**：JavaScript 错误会引发 ***JsError*** 异常。
4. **多线程环境**：不同线程使用不同的 ***KossJS*** 实例是安全的。
5. **模块加载**：需要 ***with_modules=True*** 才能使用 ***require()***。
6. **Async/Await**：异步代码会立即返回 Promise 对象，需要等待解决。

---

## 7. 常见问题

**Q: 为什么我的代码返回 "undefined"?**  
A: JavaScript 函数默认返回 undefined。如果需要返回值，确保有 return 语句。

**Q: 如何处理异步 fetch?**  
A: 由于 boa_engine 目前不支���真正的异步，您可以使用 async/await 语法但结果会是 Promise 对象，或者使用 .then() 链式调用。

**Q: 需要并发执行多个脚本怎么办？**  
A: 创建多个 ***KossJS*** 实例，每个管理一组脚本。它们独立运行。或配合 ***threading*** 模块执行。

**Q: 为什么 require() 不工作？**  
A: 确保创建实例时设置 ***with_modules=True***。

**Q: 如何加载自定义模块？**  
A: 可以通过 ***register_module_loader*** 自定义模块加载逻辑。

---

如有问题，请提交 issue。