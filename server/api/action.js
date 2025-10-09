export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)
  const { token } = body
  const secretKey = config.apiSecret
  // 前端取token
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing reCAPTCHA token'
    });
  }
  // google給的密鑰
  if (!secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'reCAPTCHA secret key is not configured'
    })
  }

  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      body: formData
    });

    const verificationResult = await response.json();

    if (!verificationResult.success) {
      console.error('reCAPTCHA verification failed:', verificationResult['error-codes']);
      throw createError({
        statusCode: 400,
        statusMessage: 'reCAPTCHA verification failed.',
      });
    }
    console.log('reCAPTCHA verification successful:', verificationResult);
    return {
      success: true,
      score: verificationResult.score, // v3 會回傳分數
    };

  } catch (error) {
    console.error('Error while verifying reCAPTCHA:', error);
    // 如果是 createError 拋出的，就直接回傳
    if (error.statusCode) {
      throw error;
    }
    // 其他 fetch 錯誤
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error while contacting reCAPTCHA service.',
    });
  }
});