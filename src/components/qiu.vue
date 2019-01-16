<template>
    <div class="wrap">
        <div class="header">
            <span class="title">第 {{ expect }}期开奖结果</span> 开奖日期：{{ data.time }}
        </div>
        <div class="body" v-if="data">
            <ul class="ball-list">
                <li class="item item-red" v-for="item in reds">{{ item }}</li>
                <li class="item item-blue" v-for="item in blues">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                data: null,
                reds: [],
                blues: []
            }
        },
        props: {
            expect: String
        },
        mounted() {
            console.log('')
            this.$http.get(`/qiu?expect=${this.expect}`).then(
                response => {
                    let data = response.data
                    this.data = data
                    let arr = this.data.openCode.split('+')
                    this.reds = arr[0].split(',')
                    this.blues = arr[1].split(',')
                },
                response => {
                    console.log(response)
                    this.loading = false
                })
        },
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            init() {
                this.update()
                this.timer = setInterval(this.update, 1000)
            },
            debug() {
            },
            update() {
                const weeks = '日一二三四五六'.split('')
                let now = new Date()
                this.hour = now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours()
                this.minute = now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes()
                this.second = now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds()
                this.month = now.getMonth() + 1
                this.date = now.getDate()
                this.week = weeks[now.getDay()]
                console.log(now.getDay())
            }
        }
    }
</script>

<style lang="scss" scoped>
.body {
    // padding: 16px;
    // font-size: 32px;
}
.header {
    margin-bottom: 8px;
}
.title {
    margin-right: 16px;
    font-weight: bold;
}
.ball-list {
    display: flex;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        margin-right: 8px;
        color: #f54646;
        font-size: 16px;
        border: 2px solid #f54646;
        border-radius: 50%;
    }
    .item-red {
        color: #f54646;
        border-color: #f54646;
    }
    .item-blue {
        color: #39f;
        border-color: #39f;
    }
}
.footer {
    padding: 16px;
    border-top: 1px solid rgba(0, 0, 0, .12);
}
.time-box {
    display: inline-block;
    padding: 16px;
    min-width: 240px;
    background-color: #fff;
    .time {
        margin-bottom: 16px;
        font-size: 48px;
        line-height: 1;
    }
    .info {
        font-size: 18px;
    }
    .second {
        margin-left: 8px;
        font-size: 24px;
    }
}
</style>
