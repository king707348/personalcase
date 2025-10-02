<template>
  <ClientOnly>
    <UTimeline 
        :items="timelineItems" 
        :default-value="timelineItems.length" 
        :color="color"
        ref="target"
        class="relative w-[80%] m-auto z-[5]"
    >
        <template #title="{ item }">
            <h3 v-if="item.title">{{ item.company }} - {{ item.title }}</h3>
            <small>{{ item.location }}</small>
        </template>
        <template #description="{ item }">
            <ul class="mt-2 ml-4">
                <li v-for="(desc, idx) in item.description" :key="idx" 
                v-if="onIntersectionObserver"
                class="text-black dark:text-slate-300">{{ desc }}
                </li>
            </ul>
        </template>
    </UTimeline>
    <div class="absolute top-[50%] right-0 translate-y-[-50%] w-[60%] brightness-[.5] dark:brightness-[.25] z-[1]">
      <NuxtImg src="/images/aus-bne.jpg" class="w-full aspect-[16/9]" />
    </div>
  </ClientOnly>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import { shallowRef, useTemplateRef } from 'vue'

const target = useTemplateRef('target')
const targetIsVisible = shallowRef(false)

const root = useTemplateRef('root')

const isVisible = shallowRef(false)

function onIntersectionObserver([entry]) {
  isVisible.value = entry?.isIntersecting || false
}

const { tm , rt } = useI18n()
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? 'secondary' : 'primary')

const timelineItems = computed(() => {
  const items = tm('timelineItem')

  return items.map(item => ({
    ...item,
    date: rt(item.date),
    title: rt(item.title),
    company: rt(item.company),
    location: rt(item.location),
    description: item.description.map(desc => rt(desc))
  }))
})

</script>

<style scoped>
    li{
        list-style: disc;
    }

</style>