import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  const lang = getQuery(event).lang || 'en'
  let currentData = (await storage.getItem(`i18n-${lang}`)) || {}

  const filePath = path.resolve(`i18n/locales/${lang}.json`)
  const json = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(json)

  console.log("currentData",lang, currentData);
  
  return currentData
})