<template>
    <my-page class="page-detail" title="搜索">
        <div class="header">
            <img class="logo" src="/static/img/yunser.svg">
            <div class="search-box">
                <input class="input" v-model="keyword" placeholder="" @keydown="keyDown($event)">
                <ui-icon-button icon="search" title="搜索" primary @click="doSearch" />
            </div>
            <div class="container">
                <ui-tabs class="type-tab" :value="activeTab" @change="handleTabChange">
                    <ui-tab value="tab1" title="全部"/>
                    <!-- <ui-tab value="tab2" title="应用"/> -->
                    <!-- <ui-tab value="tab3" title="图片"/> -->
                </ui-tabs>
            </div>
        </div>
        <div class="body">
            <div class="container">
                <div class="ui-loading" v-if="loading">
                    <ui-circular-progress :size="24"/>
                </div>
                <div class="result-list" v-if="!loading">
                    <div class="empty-box" v-if="!results.length">
                        <div class="text">搜不到结果，请换个关键词试试~</div>
                        <div>
                            <ui-raised-button class="btn" label="搜谷歌" @click="searchByGoogle" />
                            <ui-raised-button class="btn" label="百度一下" @click="searchByBaidu" />
                            <ui-raised-button class="btn" label="呵呵哒" @click="heheda" />
                        </div>
                    </div>
                    <div class="item item-link" v-for="item of results">
                        <div class="color-box" v-if="item.type === 'color'">
                            <div class="preview">
                            </div>
                            {{ item.color }}
                        </div>
                        <div v-else>
                            <img class="img" :src="item.image" v-if="item.image">
                            <a class="title" :href="item.url" target="_blank">{{ item.title }}</a>
                            <div class="content">{{ item.content }}</div>
                            <a class="url" :href="item.url" target="_blank">{{ item.url }}</a>
                        </div>
                    </div>
                </div>
            </div>
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
            keyDown(e) {
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.doSearch()
                }
            },
            search() {
                if (!this.keyword) {
                    return
                }
                let keyword = this.keyword.replace(/^\s+/, '').replace(/\s+$/, '')
                this.loading = true
                this.results = []
                // 多个数字
                let numbers = this.getNumberArr(keyword)
                if (numbers && numbers.length > 1) {
                    this.results.push({
                        content: '',
                        image: 'https://img1.yunser.com/logo/network.svg',
                        title: `对 ${keyword} 进行统计`,
                        url: `https://math.yunser.com/statistics?data=` + numbers.join(',')
                    })
                    this.results.push({
                        content: '',
                        image: 'https://img1.yunser.com/logo/network.svg',
                        title: `对 ${keyword} 进行比较`,
                        url: `https://math.yunser.com/compare?data=` + numbers.join(',')
                    })
                    if (numbers.length <= 4) {
                        this.results.push({
                            content: '',
                            image: 'https://img1.yunser.com/logo/network.svg',
                            title: `求最大公约数和最小公倍数`,
                            url: `https://math.yunser.com/prime2?data=` + numbers.join(',')
                        })
                    }
                }

                // 常用电话
                let phone = this.getPhone(keyword)
                if (phone) {
                    this.results.push({
                        content: '',
                        image: '/static/img/phone.png',
                        title: `${keyword} ${phone.desc}`,
                        url: `https://phone.yunser.com/common?data=` + keyword
                    })
                }
                // 手机号码
                if (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(keyword)) {
                    this.results.push({
                        content: '',
                        image: '/static/img/tel.png',
                        title: `手机号码“${keyword}”的归属地`,
                        url: `https://phone.yunser.com?data=` + keyword
                    })
                } else if (/^\d{15}|\d{18}$/.test(keyword)) {
                    // 身份证
                    this.results.push({
                        content: '',
                        image: 'https://img1.yunser.com/logo/network.svg',
                        title: `查看身份证 ${keyword} 的相关信息`,
                        url: `https://idcard.yunser.com/?data=` + keyword
                    })
                } else if (keyword.match(/^[0-9]+$/)) {
                    // 单个数字
                    this.results.push({
                        content: '',
                        image: 'https://img1.yunser.com/logo/network.svg',
                        title: `查看数 ${keyword} 的性质`,
                        url: `https://math.yunser.com/number/property?data=` + keyword
                    })
                }
                // IP
                if (/\d+\.\d+\.\d+\.\d+/.test(keyword)) {
                    this.results.push({
                        content: '',
                        image: '/static/img/ip.png',
                        title: `IP “${keyword}” 的相关信息`,
                        url: `https://network.yunser.com/ip?data=` + keyword
                    })
                }
                // Color
                if (/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(keyword)) {
                    this.results.push({
                        type: 'color',
                        color: keyword
                    })
                }
                // this.loading = false
                // return
                this.$http.get('/search?keyword=' + keyword).then(
                    response => {
                        let data = response.data
                        this.results = this.results.concat(data.results)
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            getPhone(text) {
                let phones = [
                    {
                        phone: '110',
                        desc: '公安报警'
                    },
                    {
                        phone: '119',
                        desc: '火警'
                    },
                    {
                        phone: '10086',
                        desc: '中国移动客服电话'
                    },
                    {
                        phone: '10010',
                        desc: '联通官方客服电话'
                    },
                    {
                        phone: '120',
                        desc: '急救电话'
                    }
                ]
                for (let phone of phones) {
                    if (phone.phone === text) {
                        return phone
                    }
                }
                return null
            },
            getNumberArr(keyword) {
                let arr = keyword.split(/\s+/)
                for (let item of arr) {
                    if (!this.isNumber(item)) {
                        return null
                    }
                }
                return arr
            },
            isNumber(text) {
                return text.match(/^[0-9]+$/)
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
                this.$router.push('/search?keyword=' + encodeURIComponent(this.keyword))
                this.search()
            },
            searchByGoogle() {
                window.open('https://www.google.com.hk/search?q=' + encodeURIComponent(this.keyword))
            },
            searchByBaidu() {
                window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(this.keyword))
            },
            heheda() {
                // window.opener = null
                // window.open('', '_self')
                // window.close()
                window.location.href = 'about:blank'
                window.close()
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';
.container {
    padding-left: 140px;
    // max-width: 1200px;
    // margin: 0 auto;
}
.header {
    padding: 16px 16px 0 16px;
    background-color: #fafafa;
    border-bottom: 1px solid #ebebeb;
    .logo {
        float: left;
        height: 32px;
        margin-top: 8px;
        margin-right: 24px;
        max-width: 240px;
        margin-bottom: 24px;
    }
}
@media all and (max-width: 740px) {
    .search-box {
        // display: block;
    }
    .header {
        .logo {
            float: inherit;
            display: block;
            margin: 0 auto 16px auto;
        }
    }
    .container {
        padding-left: 0;
    }
}
.search-box {
    display: flex;
    width: 560px;
    max-width: 100%;
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
        @include clearfix;
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
.color-box {
    padding: 16px;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    @include clearfix;
    .preview {
        float: left;
        width: 64px;
        height: 64px;
        margin-right: 16px;
        background-color: #f00;
    }
}
.empty-box {
    .text {
        margin-bottom: 16px;
    }
    .btn {
        margin-right: 8px;
    }
}
</style>
