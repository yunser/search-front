<template>
    <my-page class="page-detail" title="搜索" :page="page">
        <div class="page-header">
            <router-link to="/">
                <img class="logo" src="/static/img/yunser.svg">
            </router-link>
            <div class="search-box">
                <input class="input" v-model="keyword" placeholder="搜应用、搜命令" @keydown="keyDown($event)">
                <ui-icon-button icon="search" title="搜索" primary @click="doSearch" />
            </div>
            <div class="container">
                <ui-tabs class="type-tab" :value="activeTab" @change="handleTabChange">
                    <ui-tab value="all" title="全部"/>
                    <ui-tab value="app" title="应用"/>
                    <!-- <ui-tab value="tab3" title="图片"/> -->
                </ui-tabs>
            </div>
        </div>
        <div class="body">
            <div class="container layout">
                <div class="layout-left">
                    <div class="ui-loading" v-if="loading">
                        <ui-circular-progress :size="24"/>
                    </div>
                    <div class="tip" v-if="!this.keyword">请输入关键词搜索</div>
                    <div class="result-list" v-if="!loading && this.keyword">
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
                            <div class="result-box" v-else-if="item.type === 'result'">
                                <div class="header">
                                    <div class="question">{{ item.question }}</div>
                                    <div class="actions">
                                        <ui-icon-button class="btn-copy" icon="content_copy" tooltip="复制" :data-clipboard-text="item.result" />
                                        <ui-icon-button class="btn-copy" icon="file_download" tooltip="下载" @click="downloadText(item)" />
                                    </div>
                                </div>
                                <div class="result">
                                    <pre>{{ item.result }}</pre>
                                </div>
                            </div>
                            <div class="result-box" v-else-if="item.type === 'image'">
                                <img class="app-img" :src="item.image">
                            </div>
                            <div class="frame-box" v-else-if="item.type === 'frame'">
                                <iframe class="iframe" :src="item.url"></iframe>
                            </div>
                            <div class="result-box" v-else-if="item.type === 'app'">
                                <ui-text-field type="number" v-model.number="item.input" label="数字" />
                                <br>
                                <ui-raised-button class="app-btn" label="计算" @click="appCalculate(item)" />
                                <div class="question">{{ item.input }}的阶乘</div>
                                <div class="result">{{ item.result }}</div>
                            </div>
                            <div class="result-box" v-else-if="item.type === 'app2'">
                                <div class="result">{{ item.result }}</div>
                                <br>
                                <ui-raised-button class="app-btn" :label="item.buttonText" @click="appCalculate(item)" />
                            </div>
                            <div class="result-box" v-else-if="item.type === 'calculator'">
                                <calculator :exp="item.exp" :key="item.exp"></calculator>
                            </div>
                            <div class="result-box" v-else-if="item.type === 'calendar'">
                                <calendar2 ref="calendar" :exp="item.exp"></calendar2>
                            </div>
                            <div class="result-box" v-else-if="item.type === 'qiu'">
                                <qiu :expect="item.value"></qiu>
                            </div>
                            <div class="result-box" v-else-if="item.type === 'weather'">
                                <weather :expect="item.value"></weather>
                            </div>
                            <div class="result-box file-box" v-else-if="item.type === 'file'">
                                <img class="icon" src="/static/img/file.svg">
                                <div class="file-name">{{ item.fileName }}</div>
                                <ui-raised-button class="btn" label="下载" @click="download(item)" />
                                <!-- <calendar :exp="item.exp"></calendar> -->
                            </div>
                            <div class="result-box-no-padding" v-else-if="item.type === 'coin'">
                                <coin></coin>
                            </div>
                            <div class="" v-else-if="item.type === 'timer'">
                                <div class="result-box-no-padding">
                                    <timer></timer>
                                </div>
                                <div class="copyright">本应用由 <a href="https://time.yunser.com/" target="_blank">时间工具</a> 提供</div>
                            </div>
                            <div class="" v-else-if="item.type === 'clock'">
                                <div class="result-box-no-padding">
                                    <clock></clock>
                                </div>
                                <div class="copyright">本应用由 <a href="https://time.yunser.com/" target="_blank">时间工具</a> 提供</div>
                                <div class="martop result-box-no-padding">
                                    <clock2></clock2>
                                </div>
                            </div>
                            <div class="" v-else-if="item.type === 'clock'">
                                <!-- <div class="copyright">本应用由 <a href="https://time.yunser.com/" target="_blank">时间工具</a> 提供</div> -->
                            </div>
                            <div v-else>
                                <img class="img" :src="item.image" v-if="item.image">
                                <a class="title" href="#"  @click="openUrl(item)">{{ item.title }}</a>
                                <div class="content">{{ item.content }}</div>
                                <a class="url" href="#" @click="openUrl(item)">{{ item.url }}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layout-right">
                    <div class="section">
                        <div class="section-title">热门搜索</div>
                        <ul class="top-list">
                            <li class="item" v-for="item, index in topKeywords">
                                <div class="index">{{ index + 1 }}</div>
                                <div class="keyword" @click="searchText(item.text)">{{ item.text }}</div>
                                <div class="number">{{ item.number }}</div>
                            </li>
                        </ul>
                    </div>

                    <div class="section">
                        <div class="section-title">相关搜索</div>
                        <ul class="top-list">
                            <li class="item" v-for="item, index in relates">
                                <div class="keyword" @click="searchText(item.text)">{{ item.text }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import searchUtil from './searchUtil'
    const Clipboard = window.Clipboard

    function trim(text) {
        return text.replace(/^\s+/, '').replace(/\s+$/, '')
    }

    export default {
        data () {
            return {
                loading: false,
                keyword: '',
                activeTab: 'all',
                results: [],
                topKeywords: [],
                relates: [],
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
            console.log('mounted')
            this.init()
        },
        updated() {
            this.$refs.calendar && this.$refs.calendar.init()
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
            openUrl(item) {
                window.open(item.url, '_balnk')
                this.$http.post(`/search/click`, {
                    keyword: this.keyword,
                    url: item.url
                }).then(
                    response => {
                        let data = response.data
                    },
                    response => {
                        console.log(response)
                    })
            },
            download(item) {
                let blob = new Blob([item.content.replace(/\n/g, '\r\n')], {type: 'text/plain;charset=utf-8'})
                window.saveAs(blob, item.fileName)
            },
            downloadText(item) {
                let blob = new Blob([item.result.replace(/\n/g, '\r\n')], {type: 'text/plain;charset=utf-8'})
                window.saveAs(blob, '未命名.txt')
            },
            handleTabChange (val) {
                this.activeTab = val
                this.$router.push(`/search?keyword=${this.keyword}&type=${val}`)
            },
            init() {
                this.keyword = this.$route.query.keyword
                this.activeTab = this.$route.query.type || 'all'
                if (this.keyword) {
                    this.loadData()
                }

                this.initClipboard()
                this.initSide()
            },
            initSide() {
                this.$http.get(`/search/logs`).then(
                    response => {
                        let data = response.data
                        this.topKeywords = data
                    },
                    response => {
                        console.log(response)
                    })
            },
            initClipboard() {
                this.clipboard = new Clipboard('.btn-copy')
                this.clipboard.on('success', e => {
                    this.$message({
                        type: 'success',
                        text: '已复制'
                    })

                    console.info('Action:', e.action)
                    console.info('Text:', e.text)
                    console.info('Trigger:', e.trigger)

                    e.clearSelection()
                })
                this.clipboard.on('error', function(e) {
                    console.error('Action:', e.action)
                    console.error('Trigger:', e.trigger)
                })
            },
            loadData() {
                this.search()
            },
            keyDown(e) {
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.doSearch()
                }
            },
            searchText(text) {
                this.keyword = text
                this.doSearch()
            },
            search() {
                if (!this.keyword) {
                    return
                }
                let keyword = this.keyword.replace(/^\s+/, '').replace(/\s+$/, '')
                this.loading = true
                this.results = []
                if (this.activeTab === 'all') {

                    if (keyword.indexOf('>>') !== -1) {
                        let arr = keyword.split('>>')
                        let fileName = trim(arr[1])
                        this.results.push({
                            type: 'file',
                            fileName: fileName,
                            content: trim(arr[0])
                        })
                    }

                    let arr2 = searchUtil(keyword)
                    this.results = this.results.concat(arr2)

                }
                // this.loading = false
                // return

                this.$http.get(`/search?keyword=${encodeURIComponent(keyword)}&type=${this.activeTab}`).then(
                    response => {
                        let data = response.data
                        this.results = this.results.concat(data.results)
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
                this.$http.get(`/search/relate?limit=9&keyword=` + encodeURIComponent(keyword)).then(
                    response => {
                        let data = response.data
                        this.relates = data
                    },
                    response => {
                        console.log(response)
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
                if (this.$route.query.keyword === this.keyword) {
                    this.search()
                } else {
                    this.$router.push('/search?keyword=' + encodeURIComponent(this.keyword))
                }
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
            },
            appCalculate(item) {
                item.result = item.click(item.input)
            },
        },
        watch: {
            $route(to, from) {
                this.loadData()
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';
.container {
    padding-left: 140px;
    // max-width: 1200px;
    // margin: 0 auto;
}
.layout {
    display: flex;
}
.layout-left {
    max-width: 100%;
    width: 560px;
}
.layout-right {
    margin-left: 32px;
}
.section {
    margin-bottom: 24px;
}
.section-title {
    font-weight: bold;
    margin-bottom: 8px;
}
.top-list {
    width: 256px;
    .item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .index {
            width: 16px;
            margin-right: 4px;
            line-height: 16px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            background-color: #8eb9f5;
        }
        .keyword {
            cursor: pointer;
            color: #666;
            &:hover {
                color: #1a0dab;
            }
        }
        .number {
            margin-left: auto;
            text-align: right;
        }
        &:nth-child(1) {
            .index {
                background-color: #f54545;
            }
        }
        &:nth-child(2) {
            .index {
                background-color: #ff8547;
            }
        }
        &:nth-child(3) {
            .index {
                background-color: #ffac38;
            }
        }
    }
}
.page-header {
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
    .page-header {
        .logo {
            float: inherit;
            display: block;
            margin: 0 auto 16px auto;
        }
    }
    .container {
        padding-left: 0;
    }
    .layout-right {
        display: none;
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
    max-width: 100%;
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
    .content {
        line-height: 16px;
        max-height: 32px;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
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
.result-box-no-padding {
    border: 1px solid #e3e3e3;
    border-bottom-color: #e0e0e0;
    border-right-color: #ececec;
    box-shadow: 1px 2px 1px rgba(0,0,0,.072);
}
.result-box {
    position: relative;
    border: 1px solid #e3e3e3;
    border-bottom-color: #e0e0e0;
    border-right-color: #ececec;
    box-shadow: 1px 2px 1px rgba(0,0,0,.072);
    // border: 1px solid #f00;
    padding: 16px;
    .question {
        color: #999;
    }
    .result {
        font-size: 24px;
    }
    .actions {
        position: absolute;
        top: 0;
        right: 0;
    }
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .btn-copy {
        color: #999;
        // margin-left: 8px;
    }
}
.app-btn {
    margin-bottom: 16px;
}
.app-img {
    border: 1px solid rgba(0, 0, 0, 0.2);
}
.frame-box {
    border: 1px solid #e3e3e3;
    border-bottom-color: #e0e0e0;
    border-right-color: #ececec;
    box-shadow: 1px 2px 1px rgba(0,0,0,.072);
    // border: 1px solid #f00;
    overflow: hidden;
}
.iframe {
    border: none;
    width: 100%;
    height: 500px;
    overflow: hidden;
}
.copyright {
    margin-top: 8px;
    color: #999;
    text-align: right;
}
.tip {
    max-width: 563px;
    padding: 80px 0;
    text-align: center;
    color: #999;
}
.martop {
    margin-top: 16px;
}
.file-box {
    display: flex;
    align-items: center;
    .icon {
        width: 64px;
    }
    .file-name {
        font-size: 24px;
    }
    .btn {
        margin-left: auto;
        margin-right: 8px;
    }
}
</style>
