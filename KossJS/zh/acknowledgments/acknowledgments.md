<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members_CoreStudio = [
  {
    avatar: 'https://images-sxxyrry.pages.dev/sxxyrryAvatar_old.jpg',
    name: 'TT23XR Studio',
    title: '项目创始工作室',
    links: [
      { icon: 'github', link: 'https://github.com/sxxyrry' },
    ]
  },
]

const members_Core = [
  {
    avatar: 'https://images-sxxyrry.pages.dev/sxxyrryAvatar.jpg',
    name: 'Sxxyrry（来自 TT23XR Studio ）',
    title: '项目负责人，作者',
    links: [
      { icon: 'github', link: 'https://github.com/sxxyrry' },
    ]
  },
  {
    avatar: 'https://images-sxxyrry.pages.dev/Wangziqi0Avatar.png',
    name: 'Wangziqi0',
    title: '核心开发者',
    links: [
      { icon: 'github', link: 'https://github.com/Wangziqi0' }
    ]
  },
]

const members_Contributor = [
]
</script>

# 鸣谢

KossJS 项目的成功离不开开源社区的支持和众多贡献者的努力。在此，我们向所有帮助过项目的人和组织表示最诚挚的感谢。

## 核心依赖项目

KossJS 的开发离不开以下优秀的开源项目：

### Rust 语言生态

- **[Boa](https://github.com/boa-dev/boa)** - JavaScript 引擎
  - KossJS 的核心 JS 引擎
  - 许可证: MIT OR Apache-2.0

- **[Rust](https://www.rust-lang.org/)** - 编程语言
  - 提供内存安全保证和零成本抽象
  - 使 KossJS 能够支持多平台

### Python 接口

- **[ctypes](https://docs.python.org/3/library/ctypes.html)** - Python 外部函数库
  - 提供 Python 与 C 动态库的互操作性
  - Python 标准库的一部分

### 构建工具

- **[Cargo](https://doc.rust-lang.org/cargo/)** - 包管理器
- **[rustfmt](https://github.com/rust-lang/rustfmt)** - 代码格式化
- **[clippy](https://github.com/rust-lang/rust-clippy)** - 代码检查

## 项目团队

### 核心开发工作室

<VPTeamMembers size="small" :members="members_CoreStudio" />

### 核心开发

<VPTeamMembers size="small" :members="members_Core" />

### 贡献者（暂无）

<VPTeamMembers size="small" :members="members_Contributor" />

## 社区贡献者

感谢以下开发者：
- 感谢所有提交 Issue 和 Pull Request 的开发者
- 感谢提供宝贵建议和反馈的用户
- 感谢帮助完善文档的贡献者

## 特别感谢

- 感谢所有使用 KossJS 的用户和开发者
- 感谢 [Boa](https://github.com/boa-dev/boa) 团队提供的优秀引擎
- 感谢 Rust 社区提供的工具和库

---

## 如何贡献

如果您想为 KossJS 做出贡献，我们欢迎以下形式的帮助：

- **代码贡献**：提交 Pull Request 修复 bug 或添加新功能
- **文档改进**：完善文档，纠正错误
- **问题反馈**：提交 Issue 报告 bug 或提出功能建议
- **测试验证**：在不同平台测试 KossJS 的功能
- **推广分享**：向他人介绍和推荐 KossJS

[查看贡献指南](/zh/guide/contributing) | [提交 Issue](https://github.com/KossJS/KossJS/issues) | [发起 Pull Request](https://github.com/KossJS/KossJS/pulls)

---

**再次感谢所有为 KossJS 项目提供帮助的人！** 🎉