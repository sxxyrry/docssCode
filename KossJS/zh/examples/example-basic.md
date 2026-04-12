# KossJS 使用示例

## 基础示例

### 1. 基本计算

```python
from kossjs_interface import KossJS

with KossJS() as koss:
    result = koss.eval("1 + 2")
    print(f"1 + 2 = {result}")  # 输出: 3
```

### 2. 函数定义

```python
from kossjs_interface import KossJS

with KossJS() as koss:
    code = """
    const add = (a, b) => a + b;
    add(5, 10);
    """
    result = koss.eval(code)
    print(f"Result: {result}")  # 输出: 15
```

### 3. 异步 Fetch

```python
import time
from kossjs_interface import KossJS

with KossJS() as koss:
    code = """
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(res => res.json())
      .then(data => console.log("Title:", data.title))
    """
    koss.eval(code)
    time.sleep(1)
```

### 4. 设置全局变量

```python
from kossjs_interface import KossJS

with KossJS() as koss:
    koss.set_global("APPNAME", "MyApp")
    koss.set_global("VERSION", 1.0)
    
    result = koss.eval("APPNAME + ' v' + VERSION")
    print(f"App info: {result}")  # 输出: MyApp v1
```

---

更多示例请查看各语言接口文档。