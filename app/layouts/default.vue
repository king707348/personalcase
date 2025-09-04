<script setup>
    const { locales } = useI18n()


</script>

<template>
    <div>
        this is my first page
        {{ $t("name") }}


    </div>

  <slot />
</template>

<style>

</style>