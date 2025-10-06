<template>
    <div class="fixed right-0 top-50 z-99">
        <ul>
            <li v-for="(item, idx) in items" :key="idx" class="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600" >
                <a :href="item.href" target="_blank" class="flex p-2">
                    <Icon :name="item.icon" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
const items = reactive([
  {
    icon: "i-lucide:facebook",
    href:"https://www.facebook.com/hsuisnt/"

  },
 {
    icon: "i-lucide:github",
    href:"https://github.com/king707348"

  },
  {
    icon: "i-lucide:linkedin",
    href:"https://www.linkedin.com/in/yucheng-hsu-811a96174/"
  }
])

</script>
<style scoped>

</style>