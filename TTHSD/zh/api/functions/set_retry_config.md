# set_retry_config 函数

**功能描述**：配置下载失败时的重试参数。
**返回值**：成功返回 0，失败返回 -1（下载器不存在）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `int` | 下载器实例ID |
| `maxRetries` | `uint32` | 最大重试次数（默认 3） |
| `retryDelayMs` | `uint64` | 初始重试延迟（ms，默认 1000） |
| `maxRetryDelayMs` | `uint64` | 最大重试延迟（ms，默认 30000） |

## 重试策略

下载失败时，TTHSD 使用指数退避策略进行重试：
1. 首次失败后等待 `retryDelayMs` 毫秒
2. 每次重试失败后，等待时间翻倍
3. 等待时间上限为 `maxRetryDelayMs` 毫秒

## 示例

```c
// 配置重试：最多重试 5 次，初始延迟 2 秒，最大延迟 60 秒
set_retry_config(downloader_id, 5, 2000, 60000);
```
