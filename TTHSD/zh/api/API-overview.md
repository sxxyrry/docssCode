# API 参考

本节详细介绍了 TTHighSpeedDownloader (TTHSD) 的 API 接口、数据结构和回调机制。

## 核心概念

### 任务数据结构 (Task Data)

传递给 ***startDownload*** 等函数的任务列表必须是 JSON 格式字符串：

```json
[
  {
    "URL": "https://example.com/file.zip",
    "SavePath": "/path/to/save/file.zip",
    "ShowName": "文件显示名称",
    "ID": "unique-task-id-123"
  }
]
```

### 回调函数定义

回调函数用于接收下载过程中的所有事件和状态更新。

**C 语言定义**:
```c
typedef void (*progress_callback_t)(void* event, void* msg);
```

**Python 定义**:
```python
def callback(event_json_str, msg_json_str):
    # event_json_str 和 msg_json_str 是 JSON 字符串
    pass
```

## 事件与消息结构 (Event & Message)

回调函数的两个参数 ***event*** 和 ***msg*** 均为 JSON 格式字符串。

### 1. 事件结构 (Event)

***Event*** 对象描述了当前发生的事件类型和元数据。

| 字段 | 类型 | 说明 | 注意事项 |
| :--- | :--- | :--- | :--- |
| ***Type*** | string | 事件类型 | ***start***, ***startOne***, ***update***, ***endOne***, ***end***, ***msg***, ***err*** |
| ***Name*** | string | 事件名称 | 仅在部分事件中包含（如 ***msg*** 类型可能包含 "错误"、"停止" 等） |
| ***ShowName*** | string | 显示名称 | ***update*** 和 ***start***/***end*** 事件中为空字符串 |
| ***ID*** | string | 任务 ID | ***update*** 事件中包含对应任务 ID |

**事件类型详解**:

- ***start***: 批量任务开始（ID为空）
- ***startOne***: 单个文件开始（包含完整 ID 和 ShowName）
- ***update***: 进度更新（**包含任务 ID**）
- ***endOne***: 单个文件结束（包含完整 ID 和 ShowName）
- ***end***: 批量任务结束（ID为空）
- ***msg***: 消息通知（包括错误、暂停、恢复、停止等状态）

### 2. 消息结构 (Msg)

***Msg*** 对象的内容取决于 ***Event.Type***，且在 ***msg*** 类型下对应的 Key 可能不同。

#### ***start*** / ***end***
- **Msg 内容**: 空对象 ***{}***

#### ***startOne*** / ***endOne***
- **Msg 内容**:
```json
{
  "URL": "任务URL",
  "SavePath": "保存路径",
  "ShowName": "显示名称",
  "Index": 1,       // 当前任务索引 (从1开始)
  "Total": 5        // 总任务数
}
```

#### ***update***
- **Msg 内容**:
```json
{
  "Total": 1048576,      // 文件总字节数
  "Downloaded": 524288   // 已下载字节数
}
```

#### ***msg***
***msg*** 类型的事件用于传递各种状态信息，其 JSON Key 固定为 "Text"

- **Msg 内容**:
```json
{ "Text": "下载已停止" }
```
```json
{ "Text": "下载已暂停" }
```
```json
{ "Text": "下载已恢复" }
```

#### ***err***
***err*** 类型的事件用于传递错误信息，其 JSON Key 固定为 "Error"

- **Msg 内容**:
```json
{ "Error": "下载文件失败: ..." }
```

## 通用规则

### 内存管理 (C/C++ 调用者)
- ***tasksData*** 指向的内存需在调用期间保持有效。
- 回调函数中的 ***event*** 和 ***msg*** 指针仅在回调执行期间有效，不要在回调外部保存这些指针。
- 在 核心版本 ≥0.5.1 后  ***stopDownload*** 会清理下载器内部所有资源，包括 goroutine 和网络连接，当前下载器也会被销毁。
- 在 核心版本 ≥0.5.1 后 Python 接口封装 端调用 close() 后，应确保不再使用对应的下载器 ID。
- 在 核心版本 ≥0.5.1 后 暂停/恢复功能在并行下载（is_multiple=true）时可能存在限制，建议顺序下载时使用暂停/恢复功能。

### 线程安全
- API 函数是线程安全的。
- 可以同时管理多个不同的 ***Downloader*** 实例。
- 对同一个 ***Downloader ID*** 的操作（如 暂停 -> 恢复）应顺序执行。

### 错误处理
- API 函数返回 ***-1*** 表示失败（如参数错误）。
- 异步过程中的错误（如网络超时）将通过 ***err*** 事件类型的 ***Error*** 字段回调通知。

## 版本差异说明

### 核心版本 0.5.0 vs 0.5.1

#### pauseDownload 行为差异
- **0.5.0**: 调用后会立即从下载器映射表中删除该下载器，因此**无法恢复**下载
- **0.5.1**: 调用后保留下载器在映射表中，可以**恢复**下载（但并非断点续传）

#### stopDownload 行为差异
- **0.5.0**: 立即删除下载器，然后调用 ***StopDownload()*** 清理资源
- **0.5.1**: 立即删除下载器，然后调用 ***StopDownload()***，但内部会等待所有任务退出（***activeTasks.Wait()***）后才清理资源

#### resumeDownload 行为差异
- **0.5.0**: **无法恢复**下载（因为 ***pauseDownload*** 已删除下载器）
- **0.5.1**: **可以恢复**已暂停的下载（但无法恢复已停止的下载）

#### 错误事件类型差异
- **0.5.0**: ***startDownload_ID*** 和 ***startMultipleDownloads_ID*** 失败时发送 ***EventTypeMsg*** 事件，错误信息在 ***msg["Text"]*** 中
- **0.5.1**: 所有错误统一发送 ***EventTypeErr*** 事件，错误信息在 ***msg["Error"]*** 中，且区分 ***context.Canceled*** 不发送事件

#### 内部实现差异
- **0.5.0**: 使用 ***HSDownloader.Downloader*** 字段存储下载器实例
- **0.5.1**: 移除了 ***HSDownloader.Downloader*** 字段，统一使用 ***context.Context*** 控制取消，使用 ***sync.WaitGroup*** 跟踪活动任务

---

### 核心版本 0.5.0 的具体行为

> 如果您使用的是 TTHSD Core 0.5.0 版本，请注意以下行为差异：

**暂停功能限制**：调用 ***pauseDownload*** 后，下载器会被立即从内部映射表中删除，因此 ***resumeDownload*** 无法恢复已暂停的下载。这是 0.5.0 版本的一个已知限制。

**错误事件格式**：在 0.5.0 版本中，启动下载失败时发送的错误事件类型为 ***EventTypeMsg***，错误信息存储在 ***msg["Text"]*** 字段中，而不是 ***EventTypeErr*** 和 ***msg["Error"]***。

**任务跟踪**：0.5.0 版本使用 ***HSDownloader.Downloader*** 字段存储下载器实例，并使用 ***sync.WaitGroup*** 跟踪任务。
