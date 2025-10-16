export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)
  const { username, pass } = body

  if(username == config.DEV_USERNAME && pass == config.DEV_PASSWORD){ 
    setCookie(event, 'session', 'admin', { httpOnly: true, path: '/', maxAge: 60 * 60 })
    return { message: 'API OK', status: 'ok' }
  }else{
    return { message : 'API fail', status: 'fail'}
  } 
})