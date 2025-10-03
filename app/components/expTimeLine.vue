<template>
  <ClientOnly>
    <div class="relative flex my-5">
      <UTimeline 
          :items="timelineItems" 
          :default-value="timelineItems.length" 
          :color="color"
          class="up-to relative w-[80%] m-auto z-[5] "
      >
          <template #title="{ item }">
            <AnimatedElement>
              <div class="exp">
                <h3 v-if="item.title">{{ item.company }} - {{ item.title }}</h3>
                <small>{{ item.location }}</small>
              </div>
            </AnimatedElement>
          </template>
          <template #description="{ item }">
              <ul class="mt-2 ml-4">
                  <li v-for="(desc, idx) in item.description" :key="idx" 
                    class="text-black dark:text-slate-200">{{ desc }}
                  </li>
              </ul>
          </template>
      </UTimeline>
      
      <div class="absolute top-0 right-0 h-full w-[60%] opacity-50 dark:opacity-100 dark:brightness-[.7] z-[1]">
        <NuxtImg src="/images/aus-bne.jpg" class="w-full sticky top-0 aspect-[16/9]" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
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