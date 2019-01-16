<template>
    <div class="wrap">
        <div class="body">
            <!-- {{ timeText }} -->
            <div class="time-box">
                <div class="time">{{ hour }}:{{ minute }}<span class="second">{{ second }}</span></div>
                <div class="info">{{ month }} 月 {{ date }} 日，星期{{ week }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                second: null,
                hour: null,
                minute: null,
                month: null,
                date: null,
                week: null,
                timeText: '00:00',
            }
        },
        props: {
        },
        mounted() {
            this.init()
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
    padding: 16px;
    font-size: 32px;
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
