# get_performance_stats 函数

**功能描述**：获取下载器的性能统计数据。
**返回值**：返回 JSON 格式的性能统计数据字符串，需调用 `free_string` 释放内存。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `int` | 下载器实例ID |

## 返回数据结构

```json
{
  "total_bytes": 104857600,
  "current_speed_bps": 1048576,
  "current_speed_mbps": 1.0,
  "average_speed_bps": 2097152,
  "average_speed_mbps": 2.0,
  "peak_speed_bps": 5242880,
  "peak_speed_mbps": 5.0,
  "chunk_downloads": 10,
  "failed_chunks": 0,
  "retried_chunks": 2,
  "elapsed_time": 60.5
}
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `total_bytes` | int64 | 总下载字节数 |
| `current_speed_bps` | int64 | 当前下载速度（bytes/s） |
| `current_speed_mbps` | float | 当前下载速度（MB/s） |
| `average_speed_bps` | int64 | 平均下载速度（bytes/s） |
| `average_speed_mbps` | float | 平均下载速度（MB/s） |
| `peak_speed_bps` | int64 | 峰值下载速度（bytes/s） |
| `peak_speed_mbps` | float | 峰值下载速度（MB/s） |
| `chunk_downloads` | int | 已完成分块数 |
| `failed_chunks` | int | 失败分块数 |
| `retried_chunks` | int | 被重试的分块数 |
| `elapsed_time` | float | 下载已用时间（秒） |

## 示例

```c
// 获取性能统计
const char* stats_json = get_performance_stats(downloader_id);
// 使用 stats_json...
// 释放内存
free_string((char*)stats_json);
```
