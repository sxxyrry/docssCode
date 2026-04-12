import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KossJS",
  description: "嵌入式 JavaScript 运行时",
  base: '/KossJS/',
  lang: 'zh-CN',
  lastUpdated: true,
  ignoreDeadLinks: true,
  vite: {
    server: {
      allowedHosts: ['p.ceroxe.fun']
    }
  },
  themeConfig: {
    logo: 'https://images-sxxyrry.pages.dev/KossJS_Bigger.png',
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
      pattern: 'https://github.com/sxxyrry/docssCode/edit/main/KossJS/:path',
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
      { text: '什么是 KossJS', link: '/zh/guide/what-is-KossJS' },
      { text: '快速开始', link: '/zh/guide/getting-started' },
      { text: ' API 文档', link: '/zh/api/API-overview' },
      { text: '回到文档汇总', link: '/back/' },
    ],

    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '什么是 KossJS', link: '/zh/guide/what-is-KossJS' },
          { text: '快速开始', link: '/zh/guide/getting-started' },
          { text: '版本详解', link: '/zh/guide/version/version-overview' },
        ]
      },
      {
        text: 'API 文档',
        collapsed: false,
        items: [
          { text: 'API 概览', link: '/zh/api/API-overview' },
          {
            text: '函数列表',
            collapsed: false,
            items: [
              { text: 'koss_create', link: '/zh/api/functions/koss_create' },
              { text: 'koss_create_with_modules', link: '/zh/api/functions/koss_create_with_modules' },
              { text: 'koss_destroy', link: '/zh/api/functions/koss_destroy' },
              { text: 'koss_eval', link: '/zh/api/functions/koss_eval' },
              { text: 'koss_run_file', link: '/zh/api/functions/koss_run_file' },
              { text: 'koss_run_module', link: '/zh/api/functions/koss_run_module' },
              { text: 'koss_run_module_string', link: '/zh/api/functions/koss_run_module_string' },
              { text: 'koss_run_string', link: '/zh/api/functions/koss_run_string' },
              { text: 'koss_set_global_string', link: '/zh/api/functions/koss_set_global_string' },
              { text: 'koss_set_global_number', link: '/zh/api/functions/koss_set_global_number' },
              { text: 'koss_set_global_bool', link: '/zh/api/functions/koss_set_global_bool' },
              { text: 'koss_register_function', link: '/zh/api/functions/koss_register_function' },
              { text: 'koss_free_string', link: '/zh/api/functions/koss_free_string' },
              { text: 'koss_free_result', link: '/zh/api/functions/koss_free_result' },
              { text: 'koss_fetch', link: '/zh/api/functions/koss_fetch' },
              { text: 'koss_register_fetch', link: '/zh/api/functions/koss_register_fetch' },
              { text: 'koss_register_builtin', link: '/zh/api/functions/koss_register_builtin' },
              { text: 'koss_register_module_loader', link: '/zh/api/functions/koss_register_module_loader' },
              { text: 'koss_version', link: '/zh/api/functions/koss_version' },
            ]
          }
        ]
      },
      {
        text: '接口封装',
        collapsed: false,
        items: [
          {
            text: 'Python',
            collapsed: false,
            items: [
              { text: 'Py 接口封装怎么使用', link: '/zh/interface/py/how-to-use' },
            ]
          },
        ]
      },
      {
        text: '示例',
        collapsed: true,
        items: [
          { text: '基础示例', link: '/zh/examples/example-basic' },
        ]
      },
      {
        text: '其他',
        collapsed: false,
        items: [
          { text: '鸣谢', link: '/zh/acknowledgments/acknowledgments' },
          { text: '贡献指南', link: '/zh/guide/contributing' },
          { text: '回到文档汇总', link: '/back/' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KossJS/' }
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

