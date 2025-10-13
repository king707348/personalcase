import * as fs from 'node:fs/promises'
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event)

  if (!body) {
    throw createError({ statusCode: 400, statusMessage: '無效的表單數據' });
  }

  const fileField = body?.find(item => item.name === 'image')
  

  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, statusMessage: '未找到圖片檔案' });
  }
  const fileBuffer = fileField.data 
  const originalFilename = fileField.filename || 'upload';
  

    const fileExtension = path.extname(originalFilename);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const targetPath = path.join('public/images', uniqueFilename);
    const publicUrl = `/images/${uniqueFilename}.jpg`

  try {
    await fs.writeFile(targetPath, fileBuffer);
    console.log(`檔案已儲存：${targetPath}`)
    return {
      success: true,
      message: '圖片上傳成功',
      url: publicUrl, 
      filename: uniqueFilename
    }
  } catch (e) {
    console.error('File storage error:', e);
    throw createError({ statusCode: 500, statusMessage: 'Failed to save file' });
  }
})