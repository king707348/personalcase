export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)
  const secret = config.apiSecret
  console.log('在伺服器端成功讀取到 Secret Key:', secret)

  const res = await $fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret,
      response: body.recaptchaToken
    })
  })
  
  if (!res.success || res.score < 0.5) {
    throw createError({ statusCode: 403, statusMessage: 'reCAPTCHA 驗證失敗' })
  }

  // 通過驗證，可處理 email/message
  return { success: true }
})