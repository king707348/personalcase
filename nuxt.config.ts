// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  i18n: {
    defaultLocale: 'zh',
    baseUrl: "http://localhost:3000/",
    langDir: 'locales/',
    locales: [
      { code: "zh", file: "zh.json" },
      { code: "en", file: "en.json" }
    ],
    lazy: true
  },
  css: ['~/assets/css/main.css'],

})