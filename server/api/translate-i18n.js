export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const method = event.method
  const { lang, key, setData } = body
  const storage = useStorage('data')

  const langPath = async (lang) => {
    const currentData = (await storage.getItem(`i18n-${lang}`)) || {}
    switch(method){
      case "POST":
        if(key == "life_picture"){
          const newDb = {
            src: `/images/${setData.src}/${setData.alt}`,
            alt: setData.alt
          }
          currentData[key].push(newDb)
        }else if(key == ""){
          await storage.setItem(`i18n-${lang}`, setData)
        }

        console.log("psot currentData", lang, currentData)
        return {
          status: 200,
          message: 'Success',
          data: storage,
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