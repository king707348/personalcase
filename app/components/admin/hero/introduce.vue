<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header flex justify-between">
          <span class="my-auto">Edit</span>
          <div class="flex">
            <AvailableLocales @click="remindEvent" />
            <el-form-item class="h-auto mb-0">
              <el-button type="primary" @click="handleSave">
                儲存變更
              </el-button>
            </el-form-item>
          </div>
        </div>
      </template>

      <el-form
        v-if="editableLocaleData"
        :model="editableLocaleData"
        label-position="top"
      >
        <el-form-item label="Name">
          <el-input v-model="editableLocaleData.name" />
        </el-form-item>
        <el-form-item label="Position">
          <el-input v-model="editableLocaleData.position" />
        </el-form-item>
        <el-form-item label="Subtitle" v-if="locale == 'en'">
          <el-input v-model="editableLocaleData.subtitle" />
        </el-form-item>
        <el-form-item label="About Me">
          <el-input
            class="mb-2"
            v-for="(db, i) in editableLocaleData.about_me"
            :key="i"
            v-model="editableLocaleData.about_me[i]"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="Interests" v-if="editableLocaleData.interests">
          <el-input
            v-model="editableLocaleData.interests.content"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="ideal" v-if="editableLocaleData.ideal">
          <el-input v-model="editableLocaleData.ideal" type="textarea" />
        </el-form-item>
        <el-form-item label="ideal" v-if="editableLocaleData.ideal">
          <el-input v-model="editableLocaleData.ideal" type="textarea" />
        </el-form-item>
        <el-divider />
      </el-form>

      <div v-else>語系檔載入中...</div>
    </el-card>

    <div style="margin-top: 20px">
      <h3>表單資料即時預覽：</h3>
      <pre>{{ editableLocaleData }}</pre>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()

const localeData = ref(null)
const editableLocaleData = ref(null)

const fetchLocaleData = async () => {
  const { data, pending } = await useAsyncData('locale', () => {
    return $fetch(`/api/i18nlang?lang=${locale.value}`)
  })
  localeData.value = data.value
}

//
const remindEvent = async () => {
  const data = await $fetch(`/api/i18nlang?lang=${locale.value}`)

  localeData.value = data
  console.log(localeData.value)
}

watch(localeData, (val) => {
  if(val) editableLocaleData.value = val
  console.log(editableLocaleData.value, val)
}, { immediate: true, deep: true})

console.log(locale, localeData);

// 儲存語系檔
const handleSave = async () => {
  console.log("準備要儲存的語系檔內容:", editableLocaleData.value);
  try {
    await $fetch('/api/translate-i18n', {
      method: 'POST',
        headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: {
        lang: locale.value,
        key: "",
        setData: editableLocaleData.value
      }
    })
    ElMessage.success("語系檔已成功儲存 (模擬)");
  } catch (error) {
    ElMessage.error("儲存失敗，請查看 console");
    console.error("儲存語系檔失敗:", error);
  }
}

await fetchLocaleData()
</script>

<style scoped>
pre {
  background-color: #f4f4f5;
  padding: 15px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

</style>
