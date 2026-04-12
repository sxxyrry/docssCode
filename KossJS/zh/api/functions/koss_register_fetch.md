# koss_register_fetch 函数

**功能描述**：注册 fetch 函数。  
**返回值**：***KossResult*** 结构体。

## 函数签名

```c
KossResult koss_register_fetch(KossInstance* inst);
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| ***inst*** | ***KossInstance**** | JS 实例指针 |

## 说明

注册内置的 fetch 函数，使 JS 可以使用 ***fetch()*** 进行 HTTP 请求。

## 使用示例

```c
KossInstance* inst = koss_create();
koss_register_fetch(inst);

KossResult result = koss_eval(inst, 
    "fetch('https://api.github.com/users/github').then(r => r.json()).then(d => d.login)");
// 处理异步结果...
koss_free_result(result);

koss_destroy(inst);
```