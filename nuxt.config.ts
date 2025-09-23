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
  ],
  i18n: {
    defaultLocale: 'zh',
    strategy: 'prefix',
    locales: [
      { code: "zh", iso: "zh-TW", file: "zh.json" },
      { code: "en", iso: "en-US", file: "en.json" }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    lazy: true,
  },
  sitemap: {
    i18n: true,
    trailingSlash: true,
    exclude: [] // 排除頁面
  }

})