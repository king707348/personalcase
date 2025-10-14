<template>
  <div class="p-4">
    <h2 class="font-bold border-b-2">DASHBOARD</h2>
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