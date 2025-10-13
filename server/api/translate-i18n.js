import * as fs from 'fs/promises'
import * as path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { lang, key, value } = body

  const filePath = path.join(process.cwd(), `i18n/locales/${lang}.json`)

  try {
    const res = await fs.readFile(filePath, 'utf-8')
    const db = JSON.parse(res)
    let content = db[key]

    return { content }
  }catch(err){
    console.log(err)
  }

})