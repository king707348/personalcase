<template>
  <ClientOnly class="h-full flex items-center">
    <template #fallback>
      <div class="flex items-center justify-center h-full">Loading...</div>
    </template>
    <UCarousel
      v-slot="{ item }"
      fade
      :items="items"
      class="carousel w-full min-h-[100%] mx-auto"
    >
      <NuxtImg
        :src="item.src"
        :alt="item.alt"
        class="w-full h-[100%] object-cover object-[10%_40%]"
        format="webp"
        quality="80"
        preload
        placeholder
      />
    </UCarousel>
  </ClientOnly>
</template>

<script setup>
  const items = [
    { src: "/images/brekkie.jpg", alt: "brekkie" },
    { src: "/images/climb.jpg", alt: "climb" },
  ];
</script>

<style style="scss">
  .carousel {
    .overflow-hidden {
      display: flex;
      width: 75%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      margin: auto;
      .items-start {
        /* height: 100vh; */
        .basis-full {
          height: 100%;
        }
      }
    }
  }
</style>