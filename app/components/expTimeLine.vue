<template>
  <ClientOnly>
    <UTimeline 
        :items="timelineItems" 
        :default-value="timelineItems.length" 
        :color="color"
    >
        <template #title="{ item }">
            <h3 v-if="item.title">{{ item.company }} - {{ item.title }}</h3>
            <small>{{ item.location }}</small>
        </template>
        <template #description="{ item }">
            <ul class="mt-2 ml-4">
                <li v-for="(desc, idx) in item.description" :key="idx">{{ desc }}</li>
            </ul>
        </template>
    </UTimeline>
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