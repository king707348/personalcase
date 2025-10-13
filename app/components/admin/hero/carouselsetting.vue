<template>
  <div>
    <div class="carousel mb-4 p-2">
      <h3 class="font-bold">HERO Carousel Setting</h3>
      <div class="p-2 my-2 border-2 border-amber-300 rounded-[.75rem]">
        <el-upload 
          v-model:file-list="fileList"
          list-type="picture-card"
          :before-upload="handleBeforeUpload"
          :http-request="handleUploadRequest"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          accept="image/*"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible" title="Image Preview">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue"

const { tm, rt } = useI18n()
const uploadRef = () => {
  const picItem = tm("life_picture")

  return picItem.map((item) => ({
    name: rt(item.alt),
    url: rt(item.src)
  }))
}
const fileList = ref(uploadRef())
const dialogImageUrl = ref("")
const dialogVisible = ref(false)

const handleBeforeUpload = (rawFile) => {
  const isDuplicate = fileList.value.some(file => file.name === rawFile.name)

  if(isDuplicate){
    ElMessage.error("The photo already exists.")
    return 
  }
}

const handleRemove = async (uploadFile, uploadFiles) => {
  try{
    await ElMessageBox.confirm(
      `Are you Confirm Delete?`,
      {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "Warning"
      }
    )
  }catch (error) {
    ElMessage.info('Delete canceled.');
    return false
  }

  try {
    const res = await $fetch('/api/delete-image', {
      method: 'DELETE',
      body: {
        filePath: uploadFile.name
      }
    });
    console.log(res)

    ElMessage.success('The file has been removed from the server.!')
    return true
  }catch (error) {
    console.error('刪除檔案失敗:', error);
    ElMessage.error(error.data?.message || 'The delete operation failed. Please try again.。')
    return false;
  }
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleUploadRequest = async (options) => {
  const file = options.file
  const formData = new FormData()
  const types = "hero"

  formData.append('image', file)
  formData.append('types', types)

  try {
    const res = await $fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    })
    console.log(options)
    const db = await $fetch("/api/translate-i18n", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: {
        lang: "",
        key: "life_picture",
        setData: {
          src: types,
          alt: file.name
        }
      }
    })
    console.log(db)
    
    // console.log(res)
    if(res.success) {
      ElMessage.success(res.message)
    }else{
      ElMessage.error(res.message)
      console.log(fileList.value)
    }
  }catch (e) {
    console.log(e)
  }


}

</script>

<style type="scss">
ul.el-upload-list{
  display: flex;
  li.el-upload-list__item{
    margin-bottom: 0;
  }
}
</style>