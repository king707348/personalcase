<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header flex justify-between">
          <span>Edit</span>
          <div class="flex">
            <AvailableLocales class="my-auto mr-2" />
            <el-form-item class="h-auto">
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
const { data } = useFetch("/api/i18nlang");
console.log(data.value);

const editableLocaleData = ref(data.value);

const handleSave = async () => {
  console.log("準備要儲存的語系檔內容:", editableLocaleData.value);
  try {
    // await $fetch('/api/locales/en', {
    //   method: 'POST',
    //   body: editableLocaleData.value
    // });
    ElMessage.success("語系檔已成功儲存 (模擬)");
  } catch (error) {
    ElMessage.error("儲存失敗，請查看 console");
    console.error("儲存語系檔失敗:", error);
  }
};
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
