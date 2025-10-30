<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header flex justify-between">
          <span class="my-auto">Edit</span>
          <div class="flex">
            <AvailableLocales @click="remindEvent" />

            <el-form-item class="h-auto">
              <el-button type="primary" @click="dialogVisible = true">
                儲存變更
              </el-button>
              <el-dialog
                v-model="dialogVisible"
                title="警告"
                width="500"
              >
                <span>確定要儲存嗎?</span>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSave">
                      確認
                    </el-button>
                  </div>
                </template>
              </el-dialog>
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
        <el-form-item label="Skills">
          <el-card
            class="flex flex-col w-[100%]"
            v-for="(skills, keys) in editableLocaleData.skills"
            :key="skills"
          >
            <div class="flex flex-row">
              <div
                class="title capitalize max-w-[6rem] w-100 mr-2 border-r-1 border-r-gray-300"
              >
                {{ keys }}
              </div>
              <draggable
                :list="skills"
                group="skills"
                tag="div"
                @start="drag = true"
                @end="drag = false"
                item-key="element"
              >
                <template #item="{ element, index }">
                  <ElTag
                    class="m-1 cursor-move"
                    effect="light"
                    closable
                    @close="draggableHandleDelete(skills, index)"
                  >
                    {{ element }}
                  </ElTag>
                </template>
              </draggable>
              <el-tag class="my-auto">
                <el-input
                  v-model="newSkill[keys]"
                  @keyup.enter="draggableHandleAdd(keys, newSkill[keys])"
                  clearable
                  class="dgadd-btn"
                >
                  <template #append>
                    <el-button
                      @click="draggableHandleAdd(keys, newSkill[keys])"
                      class="add-btn"
                      >+</el-button
                    >
                  </template>
                </el-input>
              </el-tag>
            </div>
          </el-card>
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
import draggable from "vuedraggable";

const dialogVisible = ref(false);
const drag = ref(false);
const { locale } = useI18n();
const newSkill = ref({
  main: [],
  secondary: [],
  legacy: []
})

const localeData = ref(null);
const editableLocaleData = ref(null);
// 第一次渲染
const fetchLocaleData = async () => {
  const { data } = await useFetch(`/api/i18nlang?lang=${locale.value}`)

  localeData.value = data.value;
};

// 切換語系
const remindEvent = async () => {
  const data = await $fetch(`/api/i18nlang?lang=${locale.value}`);

  localeData.value = data
};

// 儲存語系檔
const handleSave = async () => {
  console.log("準備要儲存的語系檔內容:", editableLocaleData.value);
  try {
    await $fetch("/api/translate-i18n", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: {
        lang: locale.value,
        key: "",
        setData: editableLocaleData.value
      }
    })

    ElMessage.success("語系檔已成功儲存");
  } catch (error) {
    ElMessage.error("儲存失敗，請查看 console");
    console.error("儲存語系檔失敗:", error);
  }
  dialogVisible.value = false
}

const draggableHandleAdd = (keys, db) => {
  if (db.trim() == "") return;

  editableLocaleData.value.skills[keys].push(db);
  newSkill.value[keys] = [];
};

const draggableHandleDelete = (db, idx) => {
  db.splice(idx, 1);
  console.log(editableLocaleData.value);
};

await fetchLocaleData();

watch(
  localeData,
  (val) => {
    if (val) editableLocaleData.value = val;
  },
  { immediate: true, deep: true }
);

console.log(editableLocaleData.value);
</script>

<style scoped>
pre {
  background-color: #f4f4f5;
  padding: 15px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
:deep(.el-form-item) {
  margin-bottom: 0;
}
.dgadd-btn :deep(.el-input__inner) {
  margin: 0 auto;
  max-width: 50px;
  height: 100%;
}

:deep(.el-input-group__append) {
  padding: 0 0.5rem;
  .add-btn {
    width: 1rem;
    height: fit-content;
    padding: 0;
    margin-inline: 0;
    margin-block: auto;
  }
}

:deep(.el-tag) {
  .el-input-group__append {
    padding: 0;
  }
}
</style>
