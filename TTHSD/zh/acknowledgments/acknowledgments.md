<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members_Core = [
  {
    avatar: 'https://images-sxxyrry.pages.dev/sxxyrryAvatar.jpg',
    name: 'Sxxyrry',
    title: '项目负责人',
    links: [
      { icon: 'github', link: 'https://github.com/sxxyrry' },
    ]
  },
]

const members_Test = [
  {
    avatar: 'https://images-sxxyrry.pages.dev/XiaoHuiHui.jpg',
    name: 'XiaoHuiHuiB',
    title: '文档审查和测试',
    links: [
      { icon: 'github', link: 'https://github.com/xiaohuihuib' }
    ]
  },
  {
    avatar: 'https://images-sxxyrry.pages.dev/ChengHaoLee-2012Avatar.jpg',
    name: 'ChengHaoLee',
    title: '测试',
    links: [
      { icon: 'github', link: 'https://github.com/chenghaolee-2012' }
    ]
  },
]
</script>

# 鸣谢

TT 高速下载器 (TTHSD) 项目的成功离不开开源社区的支持和众多贡献者的努力。在此，我们向所有帮助过项目的人和组织表示最诚挚的感谢。

## 核心依赖项目

TTHSD 的开发离不开以下优秀的开源项目：

### Go 语言生态
- **[gorilla/websocket](https://github.com/gorilla/websocket)** - WebSocket 库
  - 提供了稳定、高效的 WebSocket 通信支持
  - 版本: v1.5.3
  - 许可证: BSD-2-Clause

### 构建工具
- **[Go](https://golang.org/)** - Go 编程语言
  - 提供了强大的并发特性和跨平台编译能力
  - 使 TTHSD 能够轻松支持 Windows、Linux 和 macOS 平台

## 项目团队

### 核心开发
<!-- - **[Sxxyrry](https://github.com/sxxyrry)** - 项目负责人
  - 架构设计、核心功能开发
  - 版本维护和技术支持

### 文档与测试
- **[XiaoHuiHuiB](https://github.com/xiaohuihuib)** - 文档审查和测试
  - 文档质量把控
  - 功能测试和问题反馈

- **[ChengHaoLee](https://github.com/chenghaolee-2012)** - 测试
  - 功能测试
  - 跨平台兼容性测试 -->

<VPTeamMembers size="small" :members="members_Core" />

### 测试和文档贡献

<VPTeamMembers size="small" :members="members_Test" />

## 社区贡献者

感谢以下开发者对项目的贡献：

- 感谢所有提交 Issue 和 Pull Request 的开发者
- 感谢提供宝贵建议和反馈的用户
- 感谢帮助完善文档的贡献者

## 特别感谢

- 感谢所有使用 TTHSD 的用户和开发者，您的反馈和建议是我们持续改进的动力
- 感谢开源社区提供的宝贵资源和支持
- 感谢 Go 社区提供的优秀工具和库

## 资源支持

- **[VitePress](https://vitepress.dev/)** - 文档站点构建工具
- **[GitHub](https://github.com/)** - 代码托管和协作平台

---

## 如何贡献

如果您想为 TTHSD 做出贡献，我们欢迎以下形式的帮助：

- **代码贡献**：提交 Pull Request 修复 bug 或添加新功能
- **文档改进**：完善文档，纠正错误，或翻译文档
- **问题反馈**：提交 Issue 报告 bug 或提出功能建议
- **测试验证**：在不同平台和场景下测试 TTHSD 的功能
- **推广分享**：向他人介绍和推荐 TTHSD

[查看贡献指南](/zh/guide/contributing) | [提交 Issue](https://github.com/sxxyrry/TTHighSpeedDownloader/issues) | [发起 Pull Request](https://github.com/sxxyrry/TTHighSpeedDownloader/pulls)

---

**再次感谢所有为 TTHSD 项目提供帮助的人和组织！** 🎉