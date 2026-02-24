# TTHSD Python 接口封装 的回调函数示例

## 提示：类型注解为可选，不影响代码运行

```python
from typing import Literal, TypedDict

# 事件字典类型定义
class Event(TypedDict):
    Type: Literal['start', 'startOne', 'update', 'end', 'endOne', 'msg', 'err']
    Name: str
    ShowName: str
    ID: str

def callback_func(event_dict: Event, msg_dict: dict[str, str | int | float]):
    # 处理不同类型的事件消息
    event_type: Literal['start', 'startOne', 'update', 'end', 'endOne', 'msg', 'err'] = event_dict.get('Type', '')
    event_name: str = event_dict.get('Name', '')  # pyright: ignore[reportUnusedVariable] # 事件名称
    event_showname: str = event_dict.get('ShowName', '')  # 事件显示名称
    event_id: str = event_dict.get('ID', '')  # 事件会话/实例ID
    if event_type == 'update':  # 更新类型事件
        total: int = msg_dict.get('Total', 0)  # 待下载总字节数 # pyright: ignore[reportAssignmentType]
        downloaded: int = msg_dict.get('Downloaded', 0)  # 已下载字节数 # pyright: ignore[reportAssignmentType]

        # 更新进度显示
        # 注意：Speed 字段已在 TTHSD 内核中移除，需自行计算
        if total > 0:
            percent = (downloaded / total) * 100
            print(f"{event_showname}（{event_id}）：{downloaded}/{total} 字节 ({percent:.2f}%)", end='\r', flush=True)

    elif event_type == 'startOne':  # 单个文件开始下载事件
        url: str = msg_dict.get('URL', '')  # 下载URL地址 # pyright: ignore[reportAssignmentType]
        task_id: str = event_dict.get('ID', '')  # 任务标识符（从 event 获取）# pyright: ignore[reportUnusedVariable, reportAssignmentType]
        index: int = msg_dict.get('Index', 0)  # 任务索引编号 # pyright: ignore[reportAssignmentType]
        total_tasks: int = msg_dict.get('Total', 0)  # 总任务数量 # pyright: ignore[reportAssignmentType]
        print(f"\n{event_showname}（{event_id}）：开始下载：{url}，这是第 {index} 个下载任务，总共 {total_tasks} 个任务。")

    elif event_type == 'start':  # 整体下载开始事件
        print(f"\n{event_showname}（{event_id}）：开始下载")

    elif event_type == 'endOne':  # 单个文件下载完成事件
        url: str = msg_dict.get('URL', '')  # 下载URL地址 # pyright: ignore[reportAssignmentType]
        task_id: str = event_dict.get('ID', '')  # 任务标识符（从 event 获取）# pyright: ignore[reportUnusedVariable, reportAssignmentType]
        index: int = msg_dict.get('Index', 0)  # 任务索引编号 # pyright: ignore[reportAssignmentType]
        total_tasks: int = msg_dict.get('Total', 0)  # 总任务数量 # pyright: ignore[reportAssignmentType]
        print(f"\n{event_showname}（{event_id}）：下载完成：{url}，这是第 {index} 个下载任务，总共 {total_tasks} 个任务。")

    elif event_type == 'end':  # 整体下载结束事件
        print(f"\n{event_showname}（{event_id}）：下载完成或已被取消")

    elif event_type == 'msg':  # 消息类型事件
            text: str = msg_dict.get('Text', '')  # 消息文本内容 # pyright: ignore[reportAssignmentType]
            # 检查是否包含错误信息（0.5.0 版本兼容）
            if text and ('错误' in text or 'Error' in text or '失败' in text):
                print(f"\n{event_showname}（{event_id}）：错误: {text}")
            else:
                print(f"\n{event_showname}（{event_id}）：{text}")

        elif event_type == 'err':  # 错误事件
            error: str = msg_dict.get('Error', '')  # 错误消息内容 # pyright: ignore[reportAssignmentType]
            print(f"\n{event_showname}（{event_id}）：错误: {error}")

```
