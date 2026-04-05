# set_speed_limit 函数

**功能描述**：设置下载速度限制。
**返回值**：成功返回 0，失败返回 -1（下载器不存在）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `int` | 下载器实例ID |
| `speedLimitBps` | `uint64` | 速度限制（bytes/s），0 表示不限制 |

## 示例

```c
// 将下载速度限制为 1MB/s
set_speed_limit(downloader_id, 1024 * 1024);

// 取消速度限制
set_speed_limit(downloader_id, 0);
```
