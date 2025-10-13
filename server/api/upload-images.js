import * as fs from 'node:fs/promises'
import * as path from 'node:path';

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event)
  const base_path = "public/images"

  if (!body) {
    throw createError({ statusCode: 400, statusMessage: '400 Bad Request.' })
  }
  const position = body?.find(item => item.name === 'types')
  const fileField = body?.find(item => item.name === 'image')

  const uploadtype = `/${position.data.toString('utf-8')}`

  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, statusMessage: 'Image file not found.' })
  }
  const fileBuffer = fileField.data 
  const originalFilename = fileField.filename || 'upload'
  
  const targetPath = path.join(`${base_path}${uploadtype}`, originalFilename);

  try {
    // 檢查檔案是否存在
    const imagesDirectory = path.resolve(process.cwd(), `${base_path}${uploadtype}`)
    const filenames = await fs.readdir(imagesDirectory)
    const imageFiles = filenames.filter(file => {
      const extension = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(extension)
    })
    
    if(imageFiles.some(f => f == originalFilename)){
      console.log(`File already exists.：${targetPath}`)
      return {
        success: false,
        message: 'File already exists.',
        filename: originalFilename,
      }
    }

    await fs.writeFile(targetPath, fileBuffer);
    console.log(`File saved：${targetPath}`)
    
    return {
      success: true,
      message: 'Image uploaded successfully',
      url: originalFilename, 
      filename: originalFilename
    }
  } catch (e) {
    console.error('File storage error:', e)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save file' })
  }
})