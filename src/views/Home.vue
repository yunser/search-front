<template>
    <my-page title="搜索" :page="page">
        <div class="wrap">
            <img class="logo" src="/static/img/yunser.svg" v-if="icon === ''">
            <a href="https://www.baidu.com/s?wd=感恩节" target="_blank" title="感恩节" v-if="icon === 'thanksgiving'">
                <img class="logo" src="/static/img/thanksgiving.svg">
            </a>
            <div class="search-box">
                <input class="input" v-model="keyword" placeholder="搜应用、搜命令" @keydown="keyDown($event)">
                <ui-icon-button icon="search" title="搜索" primary @click="search" />
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                keyword: '',
                icon: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?&utm_source=search',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted() {
            let now = new Date()
            if (now.getFullYear() === 2018 && now.getMonth() === 11 - 1 && now.getDate() === 22) {
                this.icon = 'thanksgiving'
            }
            // document.addEventListener('keydown', this._keyDown = e => {
            //     console.log(e.keyCode)
            // })
        },
        // destroyed() {

        // },
        methods: {
            keyDown(e) {
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.search()
                }
            },
            search() {
                if (!this.keyword) {
                    this.$message({
                        type: 'danger',
                        text: '请输入关键词'
                    })
                    return
                }
                let logs = this.$storage.get('logs', [])
                logs.unshift({
                    id: '' + new Date().getTime(),
                    keyword: this.keyword,
                    createTime: new Date().getTime()
                })
                this.$storage.set('logs', logs)
                this.$router.push('/search?keyword=' + encodeURIComponent(this.keyword))
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrap {
    width: 400px;
    padding: 16px 16px 80px 16px;
    max-width: 100%;
    margin: 80px auto 0 auto;
}
.search-box {
    display: flex;
    width: 400px;
    max-width: 100%;
    margin-bottom: 16px;
    // border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
    }
    .input {
        flex-grow: 1;
        display: block;
        height: 48px;
        padding: 0 16px;
        line-height: 48px;
        border: none;
        outline: none;
    }
}
.logo {
    display: block;
    margin: 0 auto 24px auto;
    max-width: 240px;
}
</style>
