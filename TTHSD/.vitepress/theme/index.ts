// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { translate2 } from './tools.ts'


export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  setup() {
    onMounted(() => {
      function tranText2CN(){
        try {
          const spans1 = document.querySelectorAll('span.menu-text');
          for (const span1 of spans1) {
            // span1.textContent = await translate2(span1.textContent, 'zh');
            if (span1.textContent === 'On this page') {
              span1.textContent = '本页内容';
            }
          }
          const spans2 = document.querySelectorAll('span.text');
          for (const span2 of spans2) {
            // span2.textContent = await translate2(span2.textContent, 'zh');
            if (span2.textContent === 'Search') {
              span2.textContent = '搜索';
            }
          }
          const spans3 = document.querySelectorAll('span.desc');
          for (const span3 of spans3) {
            // span3.textContent = await translate2(span3.textContent, 'zh');
            if (span3.textContent === 'Next page') {
              span3.textContent = '下一页';
            } else if (span3.textContent === 'Previous page') {
              span3.textContent = '上一页';
            }
          }
          const div = document.querySelector('div#doc-outline-aria-label');
          if (div) {
            div.textContent = '本页内容';
          }
        } catch(e) {
          console.error(e);
        }
        setTimeout( () => {
          tranText2CN();
        }, 1000)
      };
      if (window.location.pathname.startsWith('/TTHSD/zh/')) {
        tranText2CN();
      };
    });
  },
  enhanceApp({ app, router, siteData }) {
    setTimeout(() => {
      // 先声明变量，提升作用域
      let footerInstance: any = null;

      if (typeof window !== 'undefined' && window.Footer) {
        footerInstance = new window.Footer({
          name: 'TT 高速下载器内核',
          description: 'TT 高速下载器内核 是一个用于程序的下载器内核。使用 GNUGPL v3.0 协议 开源发布。',
          quicks: []
        }, 'https://footerjs-sxxyrry.pages.dev/');
      }

      const setFooter = () => {
          const footerE = document.querySelector('.sxxyrry-footer');
          // console.log('footerEl', footerEl);
          if (footerE) {
            footerInstance.getAndSetFooterPosition(footerE);
          } else {
            setTimeout(setFooter, 200)
          }
      }

      const setMode = () => {
        var btn = document.querySelector('button.VPSwitch.VPSwitchAppearance');
        if (btn) {
          if (btn.title.includes('dark')) {
            btn.click();
          }
          // btn.ariaChecked = 'true';
        }
      }

      router.onAfterPageLoad = (to: string) => {
        setTimeout(() => {
          setFooter()
          setMode()
        }, 200);
      };
    }, 1000);
  }
} satisfies Theme
