<template>
  <div class="p-4">
    <div class="border-b-2 pb-1">
      <h2 class="font-bold">DASHBOARD</h2>
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
  layout: "admin",
  middleware: 'auth'
})

</script>
<style type="scss">

</style>