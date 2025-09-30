export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const siteKey = config.public.NUXT_PUBLIC_RECAPTCHA_SITE_KEY

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      if (window.grecaptcha && window.grecaptcha.execute) return resolve(window.grecaptcha)

      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      script.onload = () => {
        window.grecaptcha.ready(() => {
          resolve(window.grecaptcha)
        })
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  return {
    provide: {
      recaptcha: async (action) => {
        const grecaptcha = await loadScript()
        return grecaptcha.execute(siteKey, { action })
      }
    }
  }
})