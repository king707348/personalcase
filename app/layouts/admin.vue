<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import 'element-plus/dist/index.css'

useHead({
  titleTemplate: "%s - Evan Hsu",
})
definePageMeta({
  ssr: false,
})

</script>

<style>

</style>