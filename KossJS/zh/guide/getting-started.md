# 快速开始

## 简介

KossJS 是一个高性能的嵌入式 JavaScript 运行时引擎，原生支持 HTTP/HTTPS 下载（Fetch API）和 40+ 个 Node.js 标准库模块。KossJS 采用 **Rust 语言**编写，核心逻辑编译为动态链接库 (DLL/SO/DYLIB)，可供 Python、C++、C#、Java/Kotlin 等多种语言调用。

本文档将指导您如何在 Python 项目中快速集成和使用 KossJS。

## 开源协议

本项目采用 [GNU AGPL v3.0](https://gnu.ac.cn/licenses/agpl-3.0.html) 协议开源发布。

## 安装指南

### 1. 系统要求

- **操作系统**: Windows (x64), Linux (Ubuntu 22.04+), macOS, Android
- **Python 版本**: Python 3.11 及以上
- **依赖项**: 不需要额外安装 Python 依赖库，通过 ***ctypes*** 直接调用内核。

### 2. 获取内核文件

动态链接库文件：
- Windows: ***kossjs.dll***
- Linux: ***kossjs.so***
- macOS: ***kossjs.dylib***

### 3. 获取 Python 接口封装

为了简化调用，官方提供了封装好的 Python 接口文件 ***kossjs_interface.py***。

1. 下载 ***kossjs_interface.py***
2. 将 **内核文件** 和 ***kossjs_interface.py*** 放置在您的 Python 项目根目录下

## 基本用法

### 初始化与执行

首先，导入模块并创建实例。

```python
from kossjs_interface import KossJS

# 1. 创建实例
koss = KossJS()

# 2. 执行 JavaScript 代码
result = koss.eval("1 + 2")
print(result)  # 输出: 3

# 3. 使用更复杂的代码
code = """
const sum = (a, b) => a + b;
sum(10, 20);
"""
result = koss.eval(code)
print(result)  # 输出: 30

# 4. 设置全局变量
koss.set_global("myVar", "Hello from Python")
result = koss.eval("myVar")
print(result)  # 输出: Hello from Python

# 5. 设置数字和布尔值
koss.set_global("count", 100)
result = koss.eval("count * 2")
print(result)  # 输出: 200

koss.set_global("isReady", True)
result = koss.eval("isReady ? 'Ready!' : 'Loading...'")
print(result)  # 输出: Ready!

# 6. 销毁实例
koss.destroy()
```

### 使用 Fetch API

KossJS 内置了原生 Fetch API 支持：

```python
from kossjs_interface import KossJS

koss = KossJS()

# Fetch 请求示例
fetch_code = '''
(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    return "Error: " + error.message;
  }
})();
'''

result = koss.eval(fetch_code)
print(result)

# 简化的 fetch 示例
koss.eval('''
fetch("https://api.github.com/users/github")
  .then(response => response.json())
  .then(data => console.log("User:", data.login))
''')

# 等待回调完成
import time
time.sleep(2)

koss.destroy()
```

### 运行 JavaScript 文件

```python
from kossjs_interface import KossJS

koss = KossJS()

# 运行 .js 文件
result = koss.run_file("./script.js")
print(result)

# 运行 ES Module 文件
result = koss.run_module("./module.mjs")
print(result)

koss.destroy()
```

### 注册 Native 函数

可以将 Python 函数注册为 JavaScript 可调用的函数：

```python
from kossjs_interface import KossJS, JsError

def add(a, b):
    return str(int(a) + int(b))

koss = KossJS()

# 注册 Python 函数
koss.register_function("add", add)

# 在 JavaScript 中调用
result = koss.eval("add(10, 20)")
print(result)  # 输出: 30

koss.destroy()
```

### 使用上下文管理器

```python
from kossjs_interface import KossJS

# 使用上下文管理器自动管理资源
with KossJS() as koss:
    result = koss.eval("'Hello ' + 'World'")
    print(result)  # 输出: Hello World
# 自动销毁
```

## KossJS 的特性

### 高性能
- **Rust 实现**：极低的内存占用
- **零 GC 停顿**：无垃圾回收暂停
- **快速启动**：实例创建开销极低

### 完整 JS 支持
- **ES2022**：最新的 ECMAScript 支持
- **ES Modules**：原生 import/export 支持
- **Async/Await**：异步编程支持

### 内置模块
- **Fetch API**：原生 HTTP 请求
- **Node.js 兼容**：40+ 标准库模块
- **Console**：完整的 console 对象

## 下一步

- 了解 [API 详解](/zh/api/API-overview) 以掌握更多高级功能。
- [Python 接口使用](/zh/interface/py/how-to-use) - Python 开发指南
