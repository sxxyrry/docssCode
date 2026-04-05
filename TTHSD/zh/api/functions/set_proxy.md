# set_proxy 函数

**功能描述**：设置代理服务器。
**返回值**：成功返回 0，失败返回 -1（下载器不存在）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `int` | 下载器实例ID |
| `proxyUrl` | `char*` | 代理 URL（可选，NULL 表示不使用代理） |

## 支持的代理协议

- `http://proxy:port` - HTTP 代理
- `https://proxy:port` - HTTPS 代理
- `socks5://proxy:port` - SOCKS5 代理

## 示例

```c
// 设置 HTTP 代理
set_proxy(downloader_id, "http://proxy.example.com:8080");

// 取消代理
set_proxy(downloader_id, NULL);
```
