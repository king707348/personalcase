<template>
    <main class="flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen">
        <div class="flex flex-col md:flex-row w-full h-[100vh]">
            <section class="flex-1">
                <ClientOnly class="h-full flex items-center">
                    <template #fallback>
                        <div class="flex items-center justify-center h-full">Loading...</div>
                    </template>
                    <Carousel />
                </ClientOnly>
            </section>
            <section class="relative flex flex-1 align-center justify-center hero">
                <div class="w-[80%] h-[80vh] m-auto px-4">
                    <b class="relative flex flex-row items-baseline mb-4 gap-2">
                        <span class="absolute -left-12 text-sm font-normal font-mono rotate-[-30deg]">
                            Hey, I am
                        </span>
                        <h1 class="relative text-[2.5rem] font-bold">{{ $t("name") }}</h1>
                        <small v-if="locale == 'zh'">{{ $t("eng_name") }}</small>
                    </b>
                    <h2 v-if="locale == 'en'" class="mb-4">{{ $t("subtitle") }}</h2>
                    <p v-for="(text, idx) in tm('about_me')" :key="idx" class="mb-4">
                        {{ $rt(text) }}
                    </p>
                    <template v-if="locale == 'en'">
                        <p class="mb-4">{{ $t("interests.title") }}: {{ $t("interests.content") }}</p>
                        <p class="font-bold mb-4">{{ $t("ideal") }}</p>
                    </template>
                    <span class="technical-barrier">
                        <UKbd v-for="item in skillsCategories" 
                            :key="item.name"
                            :class="['skills border mr-2', item.color]"
                        >
                            {{ $rt(item.name) }}
                        </UKbd>
                    </span>
                </div>
            </section>
        </div>
        <div>
            <ExpTimeLine />
        </div>
        
        <nav class="absolute top-0 right-0 flex p-2 gap-2">
            <NuxtLink v-for="locale in availableLocales" 
                :key="locale.code" 
                :to="switchLocalePath(locale.code)"
                class="px-2 py-1 m-auto rounded-md hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5"
            >
                {{ locale.name }}
            </NuxtLink>
            <ColorModeButton />
        </nav>

        <slot />
    </main>
</template>

<script setup>
  const { locale, locales, tm, t , rt } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
  })

  const mailSkills = tm('skills.main')
  const secondarySkills = tm("skills.secondary")
  const legacySkills = tm("skills.legacy")

  const skillsCategories = [
    ...mailSkills.map(i => ({ name: rt(i), category: 'main', color: 'border-blue-600' })),
    ...secondarySkills.map(i => ({ name: rt(i), category: 'secondary', color: 'border-green-600' })),
    ...legacySkills.map(i => ({ name: rt(i), category: 'legacy', color: 'border-red-600' }))
  ]
</script>

<style scoped>

</style>