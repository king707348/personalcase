import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const lang = getQuery(event).lang || 'en'
  const storage = useStorage('i18n/locales')
  let db = (await storage.getItem(lang)) || {}

  const filePath = path.resolve(`i18n/locales/${lang}.json`)
  const json = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(json)
  db = data
  const updated = await storage.setItem(lang, db) 

  return updated
})