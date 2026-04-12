# API 参考

本节详细介绍了 KossJS 的 API 接口、数据结构和用法。

## 核心概念

### KossInstance

KossJS 中的每个 JS 实例都是完全隔离的虚拟机 (VM)，互不影响。您可以创建任意数量的实例。

### KossResult

大多数 API 函数返回 ***KossResult*** 结构体：

```c
typedef struct {
    int code;       /* 0=ok, 1=js error, 2=bad argument */
    char *value;    /* heap string — free with koss_free_string */
} KossResult;
```

| code | 含义 |
|------|------|
| 0 | 成功 |
| 1 | JavaScript 执行错误 |
| 2 | 无效参数 |

### KossNativeFn

原生函数回调类型：

```c
typedef char* (*KossNativeFn)(int argc, const char **argv);
```

## C ABI 函数列表

以下是可用的 C ABI 函数：

### 实例生命周期

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_create*** | 创建新的 JS 实例 |
| ***koss_create_with_modules*** | 创建支持模块加载的 JS 实例 |
| ***koss_destroy*** | 销毁 JS 实例并释放内存 |

### 代码执行

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_eval*** | 执行 JavaScript 代码并返回结果 |
| ***koss_run_file*** | 执行 JavaScript 文件 |
| ***koss_run_module*** | 执行 ES Module 文件 |
| ***koss_run_string*** | 执行 JavaScript 代码字符串 |
| ***koss_run_module_string*** | 执行 ES Module 代码字符串 |

### 全局变量注入

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_set_global_string*** | 设置全局字符串变量 |
| ***koss_set_global_number*** | 设置全局数字变量 |
| ***koss_set_global_bool*** | 设置全局布尔变量 |

### 原生函数注册

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_register_function*** | 注册可从 JS 调用的原生函数 |
| ***koss_register_module_loader*** | 注册模块加载器 |
| ***koss_register_builtin*** | 注册内置函数 |

### 内存管理

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_free_string*** | 释放字符串内存 |
| ***koss_free_result*** | 释放 KossResult 内存 |

### 信息获取

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_version*** | 获取 KossJS 版本字符串 |

### Fetch API

| 函数名 | 功能描述 |
|--------|----------|
| ***koss_fetch*** | 执行 HTTP 请求 |
| ***koss_register_fetch*** | 注册 fetch 函数 |

## API 详解

### koss_create

```c
KossInstance* koss_create(void);
```

创建一个新的 JS 实例。返回指向实例的指针。

**返回值**: 成功返回实例指针，失败返回 NULL。

---

### koss_create_with_modules

```c
KossInstance* koss_create_with_modules(const char* root_dir);
```

创建一个支持模块加载的 JS 实例。

**参数**:
- ***root_dir***: 模块解析的根目录

**返回值**: 成功返回实例指针，失败返回 NULL。

---

### koss_destroy

```c
void koss_destroy(KossInstance* inst);
```

销毁 JS 实例并释放所有关联的内存。

**参数**:
- ***inst***: KossJS 实例指针

---

### koss_eval

```c
KossResult koss_eval(KossInstance* inst, const char* code);
```

执行 JavaScript 代码。

**参数**:
- ***inst***: KossJS 实例指针
- ***code***: JavaScript 代码字符串

**返回值**: KossResult 结构体

---

### koss_run_file

```c
KossResult koss_run_file(KossInstance* inst, const char* path);
```

执行 JavaScript 文件。

**参数**:
- ***inst***: KossJS 实例指针
- ***path***: 文件路径

**返回值**: KossResult 结构体

---

### koss_run_module

```c
KossResult koss_run_module(KossInstance* inst, const char* path);
```

以 ES Module 方式执行 JavaScript 文件。

**参数**:
- ***inst***: KossJS 实例指针
- ***path***: 模块文件路径

**返回值**: KossResult 结构体

---

### koss_set_global_string

```c
KossResult koss_set_global_string(KossInstance* inst, const char* name, const char* value);
```

设置全局字符串变量。

**参数**:
- ***inst***: KossJS 实例指针
- ***name***: 变量名
- ***value***: 字符串值

**返回值**: KossResult 结构体

---

### koss_set_global_number

```c
KossResult koss_set_global_number(KossInstance* inst, const char* name, double value);
```

设置全局数字变量。

**参数**:
- ***inst***: KossJS 实例指针
- ***name***: 变量名
- ***value***: 数字值

**返回值**: KossResult 结构体

---

### koss_set_global_bool

```c
KossResult koss_set_global_bool(KossInstance* inst, const char* name, int value);
```

设置全局布尔变量。

**参数**:
- ***inst***: KossJS 实例指针
- ***name***: 变量名
- ***value***: 布尔值 (0=false, 1=true)

**返回值**: KossResult 结构体

---

### koss_register_function

```c
KossResult koss_register_function(KossInstance* inst, const char* name, KossNativeFn func);
```

注册一个可以从 JavaScript 调用的原生函数。

```js
// 注册后可以在 JS 中调用
const result = myFunc("hello", 42);
```

**参数**:
- ***inst***: KossJS 实例指针
- ***name***: 函数名
- ***func***: 原生函数指针

**返回值**: KossResult 结构体

---

### koss_free_string

```c
void koss_free_string(char* s);
```

释放由 KossJS 分配的字符串内存。

**参数**:
- ***s***: 字符串指针

---

### koss_free_result

```c
void koss_free_result(KossResult result);
```

释放 KossResult 中的字符串内存。

**参数**:
- ***result***: KossResult 结构体

---

### koss_version

```c
const char* koss_version(void);
```

获取 KossJS 版本字符串。

**返回值**: 版本字符串 (如 "0.1.0-dev.2")

---

### koss_fetch

```c
KossResult koss_fetch(KossInstance* inst, const char* url_json);
```

执行 HTTP 请求。

**参数**:
- ***inst***: KossJS 实例指针
- ***url_json***: JSON 格式的请求参数

**请求参数格式**:
```json
{
  "url": "https://example.com/api",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": ""
}
```

**返回值**: KossResult 结构体，包含响应 JSON

**响应格式**:
```json
{
  "ok": true,
  "status": 200,
  "statusText": "OK",
  "body": "response body",
  "headers": {}
}
```

---

## 使用示例

### C 语言

```c
#include <stdio.h>
#include "kossjs.h"

int main() {
    KossInstance* inst = koss_create();
    if (!inst) {
        fprintf(stderr, "Failed to create instance\n");
        return 1;
    }

    KossResult result = koss_eval(inst, "1 + 2");
    if (result.code == 0) {
        printf("Result: %s\n", result.value);
        koss_free_result(result);
    }

    koss_destroy(inst);
    return 0;
}
```

### Python

```python
from kossjs_interface import KossJS

with KossJS() as koss:
    result = koss.eval("'Hello ' + 'World'")
    print(result)
```

---

如需了解各个函数的详细信息，请查看上述 API 详解。