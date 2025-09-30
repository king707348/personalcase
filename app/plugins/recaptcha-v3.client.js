import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: config.public.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
    // loaderOptions: {
    //   autoHideBadge: false,
    //   explicitRenderParameters: {
    //       badge: 'bottomright'
    //   }
    // }
  })
})