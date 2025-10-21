<template>
    <div class="px-2 py-1 m-auto rounded-md">
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        {{ locale.name }}
      </NuxtLink>
    </div>
</template>

<script setup>
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
  })
</script>