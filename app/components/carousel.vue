<template>
  <UCarousel
    v-slot="{ item }"
    fade
    :items="items"
    class="carousel w-full min-h-[75vh] mx-auto"
  >
    <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover" />
  </UCarousel>
</template>

<script setup>
    const items = [
        { src: '/images/brekkie.jpg', alt:"brekkie" },
        { src: '/images/climb.jpg', alt:"climb" },
    ]

</script>

<style >
  .carousel{
    .overflow-hidden{
      display: flex;
      width: 75%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      margin: auto;
      .items-start{
        /* height: 100vh; */
      }
    }
  }
</style>