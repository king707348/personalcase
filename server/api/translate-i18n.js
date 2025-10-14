import * as fs from 'fs/promises'
import * as path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { lang, key, setData } = body

  const filePath_zh = path.join(process.cwd(), `i18n`,`locales`,`zh.json`)
  const filePath_en = path.join(process.cwd(), `i18n`,`locales`,`en.json`)

  try {
    const res = await fs.readFile(filePath_zh, 'utf-8')
    const db = JSON.parse(res)
    const pos = db[key]
    const newDb = {
      src: `/images/${setData.src}/${setData.alt}`,
      alt: setData.alt
    }

    pos.unshift(newDb)
    db[key] = pos
    await fs.writeFile(filePath_zh, JSON.stringify(db))
   
    return { db }
  }catch(err){
    console.log(err)
  }
})