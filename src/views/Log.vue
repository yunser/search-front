<template>
    <my-page class="page-detail" title="搜索记录" :page="page">
        <div class="common-container container">
            <div class="empty" v-if="!logs.length">没有记录</div>
            <ul class="log-list">
                <li class="item" v-for="item in logs">
                    <div class="keyword">
                        <router-link :to="`/search?keyword=${encodeURIComponent(item.keyword)}`">{{ item.keyword }}</router-link>
                    </div>
                </li>
            </ul>
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
            this.init()
        },
        updated() {
            this.$refs.calendar && this.$refs.calendar.init()
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
            init() {
                this.logs = this.$storage.get('logs', [])
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
