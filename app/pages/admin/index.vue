<template>
  <div>
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class=""
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
import { FormInstance, FormRules } from 'element-plus'

useHead({
    title: "Login"
})
definePageMeta({
    layout: "admin"
})

const config = useRuntimeConfig()
const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',  
  pass: ''
})
const rules = reactive({
  username: [
    { 
        required: true,
        // validator: validateUserName, 
        trigger: 'blur' 
    }
  ],
  pass: [
    { 
        required: true,
        // validator: validatePass, 
        trigger: 'blur' 
    }
  ]
})

// const validateUserName = (rule, value, callback) => {
//     console.log(rule, value, callback)
// }

// const validatePass = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('Please input the password'))
//   } else {
//     if (ruleForm.pass !== '') {
//       if (!ruleFormRef.value) return
//       ruleFormRef.value.validateField('pass')
//     }
//     callback()
//   }
// }

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style type="scss" scoped>
    input{
        border: 1px solid gray;
    }
</style>