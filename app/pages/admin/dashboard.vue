<template>
  <div>
    <div>
      <el-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        :http-request="handleUploadRequest"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        accept="image/*"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible" title="圖片預覽">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <button @click="test">Upload</button>
  </div>
</template>


<script setup>
import { Plus } from "@element-plus/icons-vue"

const { tm, rt } = useI18n()

useHead({
  title: "Dashboard"
})
definePageMeta({
  layout: "admin"
})

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

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleUploadRequest = async (options) => {
   const file = options.file
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await $fetch("/api/upload-images", {
      method: "POST",
      body: formData
    })

    console.log(res)
    if(res) {
      ElMessage.success('圖片上傳成功！')
    }else{
      ElMessage.error('圖片上傳失敗！')
    }
  }catch (e) {
    console.log(e)
  }
}

const submitUpload = () => {
  console.log("fileList", fileList)
  // uploadRef.value.submit()
}

const test = async () => {
  const ts = await $fetch("/api/translate-i18n", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: {
      lang: "zh",
      key: "life_picture",
      setData: ""
    }
  })
  console.log(ts);
  submitUpload()
}

</script>
<style>
</style>