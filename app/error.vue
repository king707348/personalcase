<template>
  <div class="w-full h-screen flex flex-col justify-center align-center ">
    <h1 class="mx-auto">{{ error.statusCode }}</h1>
    <NuxtLink to="/" class="mx-auto">Go back home</NuxtLink>
  </div>
</template>

<script setup>
    const error = useError()
    console.log(error)
</script>