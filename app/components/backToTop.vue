<template>
  <Transition name="fade">
    <div v-if="showButton" class="fixed bottom-5 right-5 z-50">
      <UButton
        @click="scrollToTop"
        class="cursor-pointer"
        icon="i-heroicons-arrow-up-20-solid"
        size="lg"
        :ui="{ rounded: 'rounded-full' }"
        aria-label="Go to top"
      />
    </div>
  </Transition>
</template>

<script setup>
import { useScroll } from '@vueuse/core';

const { y } = useScroll(window, { behavior: 'smooth' })

const showButton = computed(() => y.value > 300);

const scrollToTop = () => y.value = 0
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>