import * as fs from 'fs/promises'
import * as path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const method = event.method
  const { lang, key, setData } = body

  const langPath = async (lang) => {
    const filePath = path.join(process.cwd(), `i18n`,`locales`,`${lang}.json`)
    try {
      const res = await fs.readFile(filePath, 'utf-8')
      const db = JSON.parse(res)

      if(method == "POST"){
        const newDb = {
          src: `/images/${setData.src}/${setData.alt}`,
          alt: setData.alt
        }

        db[key] = [...db[key], newDb]
        await fs.writeFile(filePath, JSON.stringify(db))
      }
      if(method == "DELETE"){
        db[key] = db[key].filter(item => item.alt !== setData)
        await fs.writeFile(filePath, JSON.stringify(db))
      }
      if(method !== "POST" && method !== "DELETE"){
        return { status: 405, message: `Method ${method} Not Allowed` }
      }
    }catch(err){
      console.log(err)
      return { status: 500, message: 'Server Error', error: err.message }
    }
  }

  if(lang == ""){
    langPath("en")
    langPath("zh")
  }else{
    langPath(lang)
  }
})