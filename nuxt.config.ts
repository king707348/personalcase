// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 8080
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    'v-gsap-nuxt',
    '@element-plus/nuxt'
  ],
  i18n: {
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    locales: [
      { code: "zh", name: "ZH", iso: "zh-TW", file: "zh.json" },
      { code: "en", name: "EN", iso: "en-US", file: "en.json" }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    lazy: true
  },
  ui: {
    icons: {
      light: 'i-ph-sun',
      dark: 'i-ph-moon'
    },
  },
  sitemap: {
    i18n: true,
    trailingSlash: true,
    exclude: [] // 排除頁面
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
    },
  },
  nitro: {
    storage: {
      uploads: {
        driver: 'fs',
        base: './public/images'
      }
    }
  },
  hooks: {
    'i18n:extend-pages': function (pages) {
      const pagesToRemove = pages.filter(page => page.path.startsWith('/admin'))

      pagesToRemove.forEach(page => {
        const index = pages.findIndex(p => p.path === page.path)
        if (index > -1) {
          pages.splice(index, 1)
        }
      })
    }
  },
  runtimeConfig: {
    // user username/password
    DEV_USERNAME: process.env.DEV_USERNAME,
    DEV_PASSWORD: process.env.DEV_PASSWORD,

    authSecret: process.env.NUXT_AUTH_SECRET,

    // key
    apiSecret: process.env.NUXT_RECAPTCHA_SECRET_KEY,
    public: {
      NUXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY
    }
  }

})