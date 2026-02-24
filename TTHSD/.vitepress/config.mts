import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TTHSD TT 高速下载器",
  description: "一个 跨平台、跨语言 调用的 下载器 内核",
  base: '/TTHSD/',
  lang: 'zh-CN',
  vite: {
    server: {
      allowedHosts: ['p.ceroxe.fun']
    }
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '什么是 TTHSD 核心', link: '/zh/guide/what-is-TTHSD-Core' },
      { text: '快速开始', link: '/zh/guide/getting-started' },
      { text: ' API 文档', link: '/zh/api/API-overview' },
      { text: '回到文档汇总', link: '/back' },
    ],

    sidebar: [
      {
        text: '其他',
        collapsed: true,
        items: [
          { text: '鸣谢', link: '/zh/acknowledgments/acknowledgments' },
          { text: '贡献指南', link: '/zh/guide/contributing.md' },
        ]
      },
      {
        text: '指南',
        collapsed: true,
        items: [
          { text: '什么是 TTHSD 核心', link: '/zh/guide/what-is-TTHSD-Core' },
          { text: '快速开始', link: '/zh/guide/getting-started' },
        ]
      },
      {
        text: ' API 文档',
        collapsed: true,
        items: [
          { text: ' API 概览', link: '/zh/api/API-overview' },
          {
            text: '函数列表',
            collapsed: true,
            items: [
              { text: 'getDownloader', link: '/zh/api/functions/getDownloader' },
              { text: 'startDownload', link: '/zh/api/functions/startDownload' },
              { text: 'startDownload_ID', link: '/zh/api/functions/startDownload_ID' },
              { text: 'startMultipleDownloads_ID', link: '/zh/api/functions/startMultipleDownloads_ID' },
              { text: 'pauseDownload', link: '/zh/api/functions/pauseDownload' },
              { text: 'resumeDownload', link: '/zh/api/functions/resumeDownload' },
              { text: 'stopDownload', link: '/zh/api/functions/stopDownload' }
            ]
          }
        ]
      },
      {
        text: '事件文档',
        collapsed: true,
        items: [
          { text: '事件概览', link: '/zh/event/event-overview' },
          { text: ' Event 键值对 格式', link: '/zh/event/event-format' },
          { text: '事件详解', link: '/zh/event/events/event-detail' },
          {
            text: '事件列表',
            collapsed: true,
            items: [
              { text: 'start', link: '/zh/event/events/start' },
              { text: 'startOne', link: '/zh/event/events/startOne' },
              { text: 'update', link: '/zh/event/events/update' },
              { text: 'endOne', link: '/zh/event/events/endOne' },
              { text: 'end', link: '/zh/event/events/end' },
              { text: 'msg', link: '/zh/event/events/msg' },
              { text: 'err', link: '/zh/event/events/err' },
            ]
          }
        ]
      },
      {
        text: ' Python 接口封装',
        collapsed: true,
        items: [
          { text: '怎么使用', link: '/zh/py-interface/how-to-use.md' }
        ]
      },
      {
        text: '示例',
        collapsed: true,
        items: [
          { text: ' TTHSD Python 接口封装 的 Callback 示例', link: '/zh/examples/py-interface-callback' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sxxyrry/TTHighSpeedDownloader' }
    ]
  }
  ,
  head: [
    ['script', {}, `(function(){document.addEventListener('DOMContentLoaded', function(){
      try{
        var links = document.querySelectorAll('a');
        for(var i=0;i<links.length;i++){
          var el = links[i];
          if(el.textContent && el.textContent.trim() === '回到文档汇总'){
            el.href = location.origin + '/';
            el.target = '_self';
          }
        }
      }catch(e){};
    });})();`],
    ['script', { src: `https://footerjs-sxxyrry.pages.dev/footer.js?autorun=false` }, ],
  ],
})