<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>編輯語系</span>
        </div>
      </template>

      <el-form
        v-if="editableLocaleData"
        :model="editableLocaleData"
        label-position="top"
      >
            <el-form-item label="Name">
                <el-input v-model=editableLocaleData.name />
            </el-form-item>
            <!-- <el-form-item label="Position">
                <el-input v-model="editableLocaleData.position" />
            </el-form-item>
            <el-form-item label="副標題" v-if="locale == 'en'">
                <el-input v-model="editableLocaleData.subtitle" />
            </el-form-item> -->

            <!-- <div v-if="editableLocaleData.profile">
              <el-form-item label="關於我)">
                <el-input
                  v-model="editableLocaleData.profile.about_me[0]"
                  type="textarea"
                  :rows="4"
                />
              </el-form-item>
              <div v-if="editableLocaleData.interests">
                <el-form-item label="興趣標題">
                  <el-input v-model="editableLocaleData.interests.title" />
                </el-form-item>
                <el-form-item label="興趣內容">
                  <el-input
                    v-model="editableLocaleData.interests.content"
                    type="textarea"
                  />
                </el-form-item>
              </div>
            </div> -->

        <el-divider />

        <el-form-item>
          <el-button type="primary" @click="handleSave"> 儲存變更 </el-button>
        </el-form-item>
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
const { messages, locale, tm } = useI18n()
const editableLocaleData = ref(null)

const updateEditableData = (newLocale) => {
  if (messages.value[newLocale]) {
    editableLocaleData.value = JSON.parse(JSON.stringify(messages.value[newLocale]))
    console.log(`已載入 ${newLocale} 的資料`);
  }
}

watch(locale, (newLocale) => {
  updateEditableData(newLocale)
  
}, {immediate: true });

// const handleSave = async () => {
//   console.log("準備要儲存的語系檔內容:", editableLocaleData.value);
//   try {
//     // await $fetch('/api/locales/en', {
//     //   method: 'POST',
//     //   body: editableLocaleData.value
//     // });
//     ElMessage.success("語系檔已成功儲存 (模擬)");
//   } catch (error) {
//     ElMessage.error("儲存失敗，請查看 console");
//     console.error("儲存語系檔失敗:", error);
//   }
// };
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
