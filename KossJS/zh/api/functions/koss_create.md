# koss_create 函数

**功能描述**：创建一个新的 JavaScript 实例。返回指向实例的不透明指针。  
**返回值**：成功返回实例指针，失败返回 NULL。

## 函数签名

```c
KossInstance* koss_create(void);
```

## 参数

无

## 说明

创建一个新的完全隔离的 JavaScript 虚拟机实例。该实例拥有自己的全局环境，不与其他实例共享。

## 使用示例

### C

```c
KossInstance* inst = koss_create();
if (!inst) {
    fprintf(stderr, "Failed to create instance\n");
    return 1;
}
// 使用实例...
koss_destroy(inst);
```

### Python

```python
from kossjs_interface import KossJS

koss = KossJS()
# 使用实例...
koss.destroy()
```