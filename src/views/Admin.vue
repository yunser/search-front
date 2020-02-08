<template>
    <my-page class="page-detail" title="管理平台" :page="page">
        <div class="common-container container">
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>


            <ui-text-field v-model="form.title" label="标题" />
            <br>
            <ui-text-field v-model="form.content" label="内容" />
            <br>
            <ui-text-field v-model="form.url" label="链接" />
            <br>
            <ui-raised-button primary label="提交" @click="submit" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import searchUtil from './searchUtil'
    import oss from '@/util/oss'
    const Clipboard = window.Clipboard

    function trim(text) {
        return text.replace(/^\s+/, '').replace(/\s+$/, '')
    }

    export default {
        data () {
            return {
                form: {
                    title: '',
                    content: '',
                    url: '',
                },
                logs: [],
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'apps',
                        //     href: 'https://app.yunser.com?&utm_source=search',
                        //     target: '_blank',
                        //     title: '应用'
                        // }
                    ]
                }
            }
        },
        mounted() {
            // this.debug()
        },
        destroyed() {
        },
        methods: {
            login() {
                location.href = oss.getOauthUrl()
            },
            debug() {
                this.form.title = '批量计数器'
                this.form.url = 'https://counter.yunser.com/multiple'
            },
            submit(e) {
                if (!this.form.title) {
                    this.$message({
                        type: 'danger',
                        text: '请输入标题'
                    })
                    return
                }
                if (!this.form.url) {
                    this.$message({
                        type: 'danger',
                        text: '请输入网址'
                    })
                    return
                }
                this.$http.post(`/searchItem`, {
                    title: this.form.title,
                    content: this.form.content,
                    url: this.form.url,
                }).then(
                    response => {
                        let data = response.data
                        this.$message({
                            type: 'success',
                            text: '提交成功'
                        })
                        this.form.title = ''
                        this.form.url = ''
                    },
                    response => {
                        console.log(response)
                    })
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.search()
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';
.container {
    max-width: 320px;
}
.empty {
    color: #777;
    padding: 80px 0;
    text-align: center;
}
.log-list {
    .item {
        height: 48px;
        // text-align: center;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .keyword {
        color: #ff4081;
    }
}
</style>
