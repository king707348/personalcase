<template>
  <div class="max-w-[600px] w-[80%] mx-auto my-4">
    <h3 class="text-[2rem]">{{ $t("contact.title") }}</h3>
    <p class="description mb-4">{{ $t("contact.description") }}</p>
    <UForm
      :schema="schema"
      :validate="validate"
      :state="state"
      class="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-x-2"
      @submit="onSubmit"
      @error="onError"
    >
      <UFormField :label="$t('contact.form_name')" name="name" required >
        <UInput v-model="state.name" type="text" class="w-full" />
      </UFormField>

      <UFormField :label="$t('contact.form_unit')" name="unit" >
        <UInput v-model="state.unit" type="text" class="w-full" />
      </UFormField>

      <UFormField :label="$t('contact.form_email')" name="email" class="md:col-span-2" required >
        <UInput v-model="state.email" type="email" class="w-full" />
      </UFormField>

      <UFormField :label="$t('contact.form_message')" name="message" class="md:col-span-2" required >
        <UTextarea v-model="state.message" label="Message" class="w-full" />
      </UFormField>

      <UButton type="submit" class="w-fit cursor-pointer"> {{ $t('contact.submit') }} </UButton>
    </UForm>
  </div>
</template>

<script setup>
import * as z from 'zod'

const { verify } = useRecaptcha()
const toast = useToast()
const initialState = () => ({
  name: "",
  unit: "",
  email: "",
  message: ""
})
const state = reactive(initialState())
// 保持原物件 initialState
const resetState = () => Object.assign(state, initialState())
// zod 
const schema = z.object({
  email: z.string().email('Invalid email')
})

const validate = () => {
  const error = [];
  if (!state.name) error.push({ name: "name", message: "Name is required" });
  if (!state.email) error.push({ name: "email", message: "Email is required" });
  if (!state.message) error.push({ name: "message", message: "Message is required" });

  return error;
}

async function onSubmit(event) {
  const token = await verify('submit')
  if (!token) return alert('驗證失敗')

  const res = await $fetch('/api/action', {
    method: 'POST',
    body: {
      token: token,
      recaptchaAction: "action"
    }
  })
  
  if(res.success){
    // console.log(event.data);
    // post state 到後端 存資料或發送資料 在清空
    if(event.data) resetState()

    toast.add({
      title: "Success",
      description: "The form has been submitted.",
      color: "success"
    })
  }
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