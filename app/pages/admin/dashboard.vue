<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h2 class="font-bold border-b-2">DASHBOARD</h2>
      <AvailableLocales class="mx-0" />
    </div>
    <AdminHeroCarouselsetting />
    <AdminHeroIntroduce />

  </div>
</template>

<script setup>
useHead({
  title: "Dashboard"
})
definePageMeta({
  layout: "admin"
})

</script>
<style type="scss">

</style>