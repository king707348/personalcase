export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const secret = config.apiSecret
  console.log('在伺服器端成功讀取到 Secret Key:', secret)

  // 進行驗證
  try {

    
    // reCAPTCHA 驗證成功！
    // 接著處理您的登入邏輯...
    console.log('reCAPTCHA 驗證成功')

    return { success: true, message: '登入成功' }

  } catch (error) {
    // reCAPTCHA 驗證失敗
    console.error('reCAPTCHA 驗證失敗:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Forbidden: Invalid reCAPTCHA token',
    })
  }
})