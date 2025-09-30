<template>
  <h3 class="mb-4 text-[2rem]">Contact Me</h3>
  <UForm
    :schema="schema"
    :validate="validate"
    :state="state"
    class="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-x-2"
    @submit="onSubmit"
    @error="onError"
  >
    <UFormField label="Name" name="name"  >
      <UInput v-model="state.name" type="text" class="w-full" />
    </UFormField>

    <UFormField label="Unit" name="Unit" >
      <UInput v-model="state.unit" type="text" class="w-full" />
    </UFormField>

    <UFormField label="Email" name="email" class="md:col-span-2" >
      <UInput v-model="state.email" type="email" class="w-full" />
    </UFormField>

    <UFormField label="Message" name="message" class="md:col-span-2" >
      <UTextarea v-model="state.message" label="Message" class="w-full" />
    </UFormField>

    <UButton type="submit" class="w-fit"> Submit </UButton>
  </UForm>
</template>

<script setup>
 import { useReCaptcha } from "recaptcha-v3"
import * as z from 'zod'

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
const config = useRuntimeConfig()
const toast = useToast()
const state = reactive({
  name: "",
  unit: "",
  email: "",
  message: "",
})
const schema = z.object({
  email: z.string().email('Invalid email')
})
const recaptchaToken = ref(null)
const errorMessage = ref(null)


const validate = () => {
  const error = [];
  if (!state.name) error.push({ name: "name", message: "Name is required" });
  if (!state.email) error.push({ name: "email", message: "Email is required" });
  if (!state.message)
    error.push({ name: "message", message: "Message is required" });

  return error;
}

async function onSubmit(event) {
  // const token = await executeRecaptcha('action')

  // errorMessage.value = null
  // recaptchaToken.value = null

  // // 等待 reCAPTCHA 腳本載入完成
  // await recaptchaLoaded()

  // if (!token) {
  //   errorMessage.value = '無法取得 reCAPTCHA Token，請稍後再試。'
  //   return
  // }

  // recaptchaToken.value = token
  // console.log(token)
  // try{
  //   const response = await fetch("/api/action", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ 
  //         ...state,
  //         recaptcha_token: token 
  //       })
  //   })

  //   if (response.ok) {
  //     console.log("response is ok");
  //   }
  //   const result = await response.json()
  //   console.log('後端回應:', result)
  // }catch (error) {
  //   console.error(error)
  //   errorMessage.value = '表單提交失敗，請稍後再試。'
  // }

  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}

async function onError(event) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id);
    element?.focus();
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
</script>

<style lang="scss" >
</style>