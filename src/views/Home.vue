<template>
    <my-page title="搜索">
        <ui-text-field v-model="keyword" />
        <ui-raised-button label="搜索" @click="search" />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                keyword: ''
            }
        },
        methods: {
            search() {
            }
        }
    }
</script>

<style scoped>
</style>
