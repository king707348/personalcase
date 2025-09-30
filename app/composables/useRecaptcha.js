export const useRecaptcha = () => {
  const recaptcha = useNuxtApp().$recaptcha

  const verify = async (action = 'submit') => {
    try {
      const token = await recaptcha(action)
      return token
    } catch (err) {
      console.error('reCAPTCHA 載入失敗', err)
      return null
    }
  }

  return { verify }
}