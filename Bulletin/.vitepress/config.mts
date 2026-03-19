import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TT23XR Studio 公告栏",
  description: "TT23XR Studio 公告栏",
  base: '/Bulletin/',
  lang: 'zh-CN',
  lastUpdated: true,
  ignoreDeadLinks: true,
  vite: {
    server: {
      allowedHosts: ['p.ceroxe.fun']
    }
  },
  themeConfig: {
    logo: 'https://images-sxxyrry.pages.dev/Bulletin_Bigger.png',
    outline: {
      label: '在本页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    externalLinkIcon: true,
    editLink: {
      pattern: 'https://github.com/sxxyrry/docssCode/edit/main/Bulletin/:path',
      text: '在 Github 上编辑此页'
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '回到文档汇总', link: '/back/' },
      { text: '描述（概览）', link: '/zh/overview' },
    ],

    sidebar: [
      {
        text: '概览',
        collapsed: false,
        items: [
          { text: '概览', link: '/zh/overview' },
          { text: '公告列表', link: '/zh/list' },
        ]
      },
      {
        text: '公告',
        collapsed: true,
        items: [
          { text: '对 TTHSD Next ABI 变动的解释', link: '/zh/ABI-Changing-Explan' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TTHSDownaloder/TTHSDNext' }
    ]
  }
  ,
  head: [
    ['script', {}, `
      var func = () => {setTimeout(() => {
        try{
          var links = document.querySelectorAll('a');
          for(var i=0;i<links.length;i++){
            var el = links[i];
            if(el.href && el.href.includes('/back')){
              el.href = location.origin + el.href.substring(window.location.origin.length + ('/' + window.location.pathname.split('/').slice(1)[0]).length + 5);
              el.target = '_self';
            }
          }
        }catch(e){};
        setTimeout(func, 100);
      }, 1000);}
      
      document.addEventListener('DOMContentLoaded', func)
      setTimeout(func, 1000)
      `],
    ['script', { src: `https://footerjs-sxxyrry.pages.dev/footer.js?autorun=false` }, ],
  ],
})