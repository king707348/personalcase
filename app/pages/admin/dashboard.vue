<template>
  <div class="p-4">
    <h2 class="font-bold border-b-2">DASHBOARD</h2>
    <AdminHeroCarouselsetting />
    <AdminHeroIntroduce />


    <button @click="test">Upload</button>
  </div>
</template>

<script setup>
useHead({
  title: "Dashboard"
})
definePageMeta({
  layout: "admin"
})

const test = async () => {
  const ts = await $fetch("/api/translate-i18n", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: {
      lang: "zh",
      key: "life_picture",
      setData: "",
    }
  })
  console.log(ts)
}
</script>
<style type="scss">

</style>