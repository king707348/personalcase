import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event ) => {
  const lang = getCookie(event, 'i18n_redirected') || 'zh'
  const filePath = path.resolve(`i18n/locales/${lang}.json`)
  const json = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(json)
  console.log('lang', lang)

  return data
})