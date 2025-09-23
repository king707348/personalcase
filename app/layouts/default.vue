<template>
    <main class="flex bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen">
        <section class="flex-1">
            <NuxtImg src="/images/brekkie.jpg" alt="Evan Hsu" class="h-full w-full object-cover" />
        </section>
        <section class="relative flex flex-1 align-center justify-center hero">
            <div class=" w-[80%] h-[80vh] m-auto px-4">
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
                <p v-if="locale == 'en'" class="mb-4">{{ $t("interests.title") }}: {{ $t("interests.content") }}</p>
                <span v-if="locale == 'en'" class="font-bold">{{ $t("ideal") }}</span>
            </div>
        </section>
        <ColorModeButton class="absolute top-0 right-0" />

        <slot />
    </main>
</template>

<script setup>
  const { locale, tm } = useI18n()

    console.log(locale)

</script>

<style>

</style>