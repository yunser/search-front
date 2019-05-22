<template>
    <my-page title="提交收录" :page="page">
        <div class="common-container">
            <ui-text-field v-model="url" label="网站网址" />
            <br>
            <ui-text-field v-model="contact" label="联系方式" />
            <br>
            <ui-raised-button primary label="提交" @click="submit" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                url: '',
                contact: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/articles/4b218900f64711e8aeb6912597532541',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            submit(e) {
                if (!this.url) {
                    this.$message({
                        type: 'danger',
                        text: '请输入网址'
                    })
                    return
                }
                this.$http.post(`/search/submit`, {
                    url: this.url,
                    contact: this.contact
                }).then(
                    response => {
                        let data = response.data
                        this.$message({
                        type: 'success',
                        text: '提交成功'
                    })
                    },
                    response => {
                        console.log(response)
                    })
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.search()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>
