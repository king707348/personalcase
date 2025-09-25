<template>
  <div>
    <form action="">
        <div class="mb-2 flex gap-2">
            <label for="Account">Account</label>
            <input type="text" id="Account" required />
        </div>
        <div class="mb-2 flex gap-2">
            <label for="password">password</label>
            <input type="password" id="password" required />
        </div>
        <div class="mb-2 flex gap-2">
            <input type="submit" class="px-3 py-1" value="submit" />
        </div>
    </form>
  </div>
</template>

<script setup>
    useHead({
        titleTemplate: "%s - Evan Hsu",
        title: "Login"
    })
    definePageMeta({
        layout: false
    })

</script>

<style type="scss" scoped>
    input{
        border: 1px solid gray;
    }
</style>