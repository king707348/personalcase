export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const method = event.method
  const { lang, key, setData } = body

  const langPath = async (lang) => {
    const storage = useStorage('asserts:server:i18n')
    const storageKey = 'i18n:en';
    let db = (await storage.getItem(lang)) || {}
    console.log('db', lang, db)

    switch(method){
      case "POST":
        if(key == "life_picture"){
          const newDb = {
            src: `/images/${setData.src}/${setData.alt}`,
            alt: setData.alt
          }
          db[key].push(newDb)
        }else if(key == ""){
          db = setData
        }

        await storage.setItem(lang, db)
        return {
          status: 200,
          message: 'Success',
          data: db,
          lang: lang
        }

      case "DELETE":
        break
      default:
        return { status: 405, message: `Method ${method} Not Allowed` }
    }
  }

  if(lang == ""){
    await langPath("en")
    await langPath("zh")
  }else{
    await langPath(lang)
  }
})