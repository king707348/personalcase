<template>
  <UCarousel
    v-slot="{ item }"
    fade
    arrows
    dots
    :items="items"
    class="w-full mx-auto"
  >
    <img :src="item.src" :alt="item.alt" width="640" class="rounded-lg w-full h-full object-cover" />
  </UCarousel>
</template>

<script setup>
    const items = [
        { src: '/images/brekkie.jpg', alt:"brekkie" },
        { src: '/images/climb.jpg', alt:"climb" },
    ]

</script>

<style>

</style>