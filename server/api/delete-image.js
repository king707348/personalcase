import * as fs from 'node:fs/promises'
import * as path from 'node:path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { filePath } = body
    
    const allowedRootPath = path.resolve(process.cwd(), 'public/images/hero');
    const targetPath = path.join(allowedRootPath, filePath);
    const resolvedPath = path.resolve(targetPath);
    
    try {
        // 檢查檔案是否存在
        await fs.access(resolvedPath);
        
        // 執行刪除
        await fs.unlink(resolvedPath);

        console.log(`The file has been deleted.: ${resolvedPath}`);

        // 回傳成功的訊息
        return {
            status: 'ok',
            message: 'The file has been deleted.'
        };

    } catch (error) {
        if (error.code === 'ENOENT') {
            // ENOENT: Error NO ENTity (檔案或目錄不存在)
            console.warn(`The file could not be found: ${resolvedPath}`);
            throw createError({
                statusCode: 404,
                statusMessage: 'File not found.',
            });
        }

        console.error(`Failed to delete the file.: ${resolvedPath}`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error: Could not delete the file.',
        });
    }
})