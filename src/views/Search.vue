<template>
    <my-page class="page-detail" title="搜索">
        <div class="header">
            <img class="logo" src="/static/img/yunser.svg">
            <div class="search-box">
                <input class="input" v-model="keyword" placeholder="">
                <ui-icon-button icon="search" title="搜索" primary @click="search" />
            </div>
            <div>
                <ui-tabs class="type-tab" :value="activeTab" @change="handleTabChange">
                    <ui-tab value="tab1" title="全部"/>
                    <ui-tab value="tab2" title="应用"/>
                    <ui-tab value="tab3" title="图片"/>
                </ui-tabs>
            </div>
        </div>
        <div class="body">
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <ul class="result-list" v-if="!loading">
                <div v-if="!results.length">
                    搜不到结果，请换个关键词试试~
                </div>
                <li class="item" v-for="item of results">
                    <img class="img" :src="item.image" v-if="item.image">
                    <a class="title" :href="item.url" target="_blank">{{ item.title }}</a>
                    <div class="content">{{ item.content }}</div>
                    <a class="url" :href="item.url" target="_blank">{{ item.url }}</a>
                </li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                keyword: '',
                activeTab: 'tab1',
                results: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            handleTabChange (val) {
                this.activeTab = val
            },
            init() {
                this.keyword = this.$route.query.keyword
                this.search()
            },
            search() {
                if (!this.keyword) {
                    return
                }
                this.loading = true
                this.results = []
                this.$http.get('/search?keyword=' + this.keyword).then(
                    response => {
                        let data = response.data
                        this.results = data.results
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            doSearch() {
                if (!this.keyword) {
                    this.$message({
                        type: 'danger',
                        text: '请输入关键词'
                    })
                    return
                }
                console.log('调整')
                this.$router.push('/search?keyword=' + this.keyword)
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    padding: 16px 16px 0 16px;
    background-color: #fafafa;
    border-bottom: 1px solid #ebebeb;
    .logo {
        float: left;
        height: 40px;
        margin-top: 4px;
        margin-right: 24px;
    }
}
.search-box {
    display: flex;
    width: 400px;
    // border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    background-color: #fff;
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
    max-width: 240px;
    margin-bottom: 24px;
}
.body {
    padding: 16px;
    .ui-loading {
        margin-top: 80px;
        margin-left: 160px;
    }
}
.result-list {
    width: 560px;
    .item {
        margin-bottom: 24px;
        overflow: hidden;
    }
    .img {
        float: left;
        width: 64px;
        height: 64px;
        margin-right: 16px;
        border-radius: 8px;
    }
    .title {
        color: #1a0dab;
        font-size: 18px;
        &:hover {
            text-decoration: underline;
        }
    }
    .url {
        display: block;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 320px;
    }
}
</style>
