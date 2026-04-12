# koss_create_with_modules 函数

**功能描述**：创建一个支持模块加载的 JavaScript 实例。  
**返回值**：成功返回实例指针，失败返回 NULL。

## 函数签名

```c
KossInstance* koss_create_with_modules(const char* root_dir);
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| ***root_dir*** | ***const char**** | 模块解析的根目录 |

## 说明

创建一个新的 JavaScript 实例，并启用模块解析功能。可以使用 ***require()*** 加载模块。

## 使用示例

```c
KossInstance* inst = koss_create_with_modules("/path/to/modules");
// 现在可以使用 require()
koss_destroy(inst);
```