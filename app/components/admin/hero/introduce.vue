<template>
    <div>
        <h3 class="font-bold">Profile</h3>
        <el-form
            ref="profileText[0]"
            label-width="auto"
        >
            <el-form-item 
                v-for="(itemObj, index) in profileText"
                :key="index"
                :label="`item${index + 1}`" 
                :prop="`${index}.item`"
            >
                <el-input v-model="itemObj.item" type="textarea" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
const { tm, rt } = useI18n()
const about_me = tm("about_me")
const profileText = ref(about_me.map((item) => ({
    item: rt(item)
})))




</script>

<style >
textarea{
    min-height: 6rem;
}

</style>