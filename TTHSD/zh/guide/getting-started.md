# 快速开始

> [!WARNING]
> 注意：本文档及其以下所有文档主要针对 TTHSD 核心 ≥0.5.1 版本
> 
> 如果您使用的是 TTHSD 核心 0.5.0 版本，请注意以下限制：
> - 暂停后无法恢复下载（***pauseDownload*** 会删除下载器）
> - 错误事件可能以 ***EventTypeMsg*** 形式发送，而非 ***EventTypeErr***
> - ***stopDownload*** 不会等待任务退出，立即清理资源
> 
> 请根据实际使用的内核版本参考相应文档

## 简介

TT High Speed Downloader (TTHSD) 是一个高性能的多线程下载器内核，支持 HTTP/HTTPS 等协议。它由 Go 语言编写，核心逻辑编译为动态链接库 (DLL/SO/DYLIB)，可供 Python、C++、C# 等多种语言调用。

本文档将指导您如何在 Python 项目中快速集成和使用 TTHSD。

## 安装指南

### 1. 系统要求

- **操作系统**: Windows (x64), Linux (Ubuntu 22.04+), macOS
- **Python 版本**: Python 3.11 及以上
- **依赖项**: 不需要额外安装 Python 依赖库，通过 ***ctypes*** 直接调用内核。

### 2. 获取内核文件

您需要下载对应平台的动态链接库文件：

- **Windows**: ***TTHighSpeedDownloader.dll***
- **Linux**: ***TTHighSpeedDownloader.so***
- **macOS**: ***TTHighSpeedDownloader.dylib***

> [!TIP]
> 您可以在 [GitHub Releases](https://github.com/sxxyrry/TTHighSpeedDownloader/releases/latest) 页面下载最新版本的内核文件。

### 3. 获取 Python 接口封装

为了简化调用，官方提供了封装好的 Python 接口文件 ***TTHSD_interface.py***。

1. 下载 ***TTHSD_interface.py***。
2. 将 **内核文件** 和 ***TTHSD_interface.py*** 放置在您的 Python 项目根目录下。

## 基本用法

以下示例展示了如何初始化下载器并下载一个文件。

### 初始化与回调

首先，导入模块并定义一个回调函数来接收下载进度和状态。

```python
from TTHSD_interface import TTHSDownloader
import json

# 1. 实例化下载器
# 确保 dll/so 文件在当前目录或系统路径中
downloader = TTHSDownloader()

# 2. 定义回调函数
# event_dict: 包含事件类型(Type)、任务ID(ID)等元数据
# msg_dict: 包含具体的进度数据(Total, Downloaded)或错误信息
def progress_callback(event_dict, msg_dict):
    event_type = event_dict.get("Type")
    
    if event_type == "update":
        # 进度更新
        total = msg_dict.get("Total", 0)
        downloaded = msg_dict.get("Downloaded", 0)
        if total > 0:
            percent = (downloaded / total) * 100
            print(f"\r进度: {percent:.2f}% ({downloaded}/{total}) 字节", end="")
            
    elif event_type == "endOne":
        print(f"\n文件下载完成: {msg_dict.get("ShowName")}")
        
    elif event_type == "msg":
        print(f"\n消息: {msg_dict["Text"]}")
    
    elif event_type == "err":
        print(f"\n错误: {msg_dict["Error"]}")

# 3. 启动下载
# start_download 会返回一个下载器 ID
task_id = downloader.start_download(
    urls=["https://example.com/file.zip"],
    save_paths=["./downloads/file.zip"],
    thread_count=16,      # 线程数 (默认根据 CPU 核心数自动调整)
    chunk_size_mb=10,     # 分块大小 (MB)
    callback=progress_callback,
    is_multiple=False     # 是否并行下载 (False 为顺序下载)
)

print(f"下载任务已启动，ID: {task_id}")

# 注意：主程序不能立即退出，否则后台下载线程会被终止。
# 在实际 GUI 程序中不需要此步，但在脚本中需要阻塞主线程。
input("按 Enter 退出...")
```

## 下一步

- 了解 [ API 详解](/zh/api/API-overview) 以掌握更多高级功能。
