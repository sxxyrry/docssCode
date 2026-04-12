# koss_register_builtin 函数

**功能描述**：注册内置函数。  
**返回值**：***KossResult*** 结构体。

## 函数签名

```c
KossResult koss_register_builtin(KossInstance* inst, const char* builtin_name, KossNativeFn func);
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| ***inst*** | ***KossInstance**** | JS 实例指针 |
| ***builtin_name*** | ***const char**** | 内置函数名 |
| ***func*** | ***KossNativeFn*** | 原生函数指针 |

## 说明

注册一个内置函数，可以在 JS 中直接调用，无需前缀。

## 使用示例

```c
char* my_print(int argc, const char** argv) {
    for (int i = 0; i < argc; i++) {
        printf("%s ", argv[i]);
    }
    printf("\n");
    return strdup("undefined");
}

KossInstance* inst = koss_create();
koss_register_builtin(inst, "print", my_print);

koss_eval(inst, "print('Hello', 'World')");  // 输出: Hello World

koss_destroy(inst);
```