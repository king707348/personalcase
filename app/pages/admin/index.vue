<template>
  <div class="flex justify-center items-center min-h-[100vh]">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-position="top"
      label-width="auto"
      class="h-fit px-8 py-4 border-4 rounded-2xl bg-white"
      style="max-width: 600px"
    >
      <el-form-item label="User Name" prop="username">
        <el-input v-model="ruleForm.username" type="text" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Submit
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
useHead({
  title: "Login",
});
definePageMeta({
  layout: "admin",
});

const ruleFormRef = ref();
const ruleForm = reactive({
  username: "",
  pass: "",
});

const validatePass = (rule, value, callback) => {
  if (value.length < 4) {
    callback(new Error("Password is too slow"));
  }
  if (value === "") {
    callback(new Error("Password is Required"));
  } else {
    if (ruleForm.pass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("pass");
    }
    callback();
  }
};

const rules = reactive({
  username: [
    {
      required: true,
      message: "User Name is Required",
      trigger: "blur",
    },
  ],
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log("submit!");
      const res = await $fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: ruleForm,
        immediate: false
      });

      console.log(res);
      if (res.status == "ok") {
        // If you need to use a cookie composable, ensure it's available in your environment,
        // e.g. useCookie is provided by Nuxt; otherwise handle cookies manually here.
        await navigateTo("/admin/dashboard");
      }
    } else {
      console.log("error submit!");
    }
    formEl.resetFields();
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style type="scss" scoped>
input {
  border: 1px solid gray;
}
</style>
