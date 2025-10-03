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
    'v-gsap-nuxt'
  ],
  i18n: {
    defaultLocale: 'zh',
    strategy: 'prefix',
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
  runtimeConfig: {
    apiSecret: process.env.NUXT_RECAPTCHA_SECRET_KEY,
    public: {
      NUXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY
    }
  }

})