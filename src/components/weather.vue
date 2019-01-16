<template>
    <div class="wrap">
        <div class="title">{{ expect }}天气</div>
        <div class="weather-box" v-if="data">
            <!--<div class="today-date">{{ data.date }}</div>-->
            <!-- <div class="info" :style="{color: color}">空气质量：{{ getPm25() }}</div> -->
            <ul class="weather-list">
                <li class="item" v-for="item, index in data.forecasts" v-if="index < 3">
                    <div class="date">{{ simpleDate(item.date, index) }}</div>
                    <div>{{ item.dayTemp }} ~ {{ item.nightTemp }} ℃</div>
                    <div>{{ item.weather }}</div>
                    <div>风力 {{ item.dayWindPower }}</div>
                    <div class="img">
                        <div v-if="item.dayWeather === item.nightWeather">{{ item.dayWeather }}</div>
                        <div v-if="item.dayWeather !== item.nightWeather">{{ item.dayWeather }} 转 {{ item.nightWeather }}</div>
                        <!-- <img :src="item.dayPictureUrl" title="白天"/>
                        <img :src="item.nightPictureUrl" title="晚上"/> -->
                    </div>
                </li>
            </ul>
            <ui-article>
                <!-- <h2>温馨建议</h2> -->
                <ul>
                    <!-- <li v-for="item in data.results[0].index">
                        {{ item.title }}：{{ item.des }}
                    </li> -->
                </ul>
            </ui-article>
        </div>
        <!-- <div class="header">
            <span class="title">第 {{ expect }}期开奖结果</span> 开奖日期：{{ data.time }}
        </div>
        <div class="body" v-if="data">
            <ul class="ball-list">
                <li class="item item-red" v-for="item in reds">{{ item }}</li>
                <li class="item item-blue" v-for="item in blues">{{ item }}</li>
            </ul>
        </div> -->
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
             this.$http.get('/weather?location=' + this.expect).then(
                response => {
                    let data = response.data
                    console.log(data)
                    this.data = data
                    this.$storage.set(this.location + 'date', new Date().getHours())
                    this.$storage.set(this.location + 'data', data)
                },
                response => {
                    console.log(response)
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
            },
            simpleDate(value, index) {
                // moment(value, 'YYYY-MM-DD')
                if (index === 0) {
                    return '今天'
                }
                if (index === 1) {
                    return '明天'
                }
                return '后天'
            }
        },
        filters: {
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
    font-size: 20px;
    margin-bottom: 16px;
}
.today-date {
    margin-bottom: 16px;
}
.info {
    margin-bottom: 16px;
}
.weather-list {
    display: flex;
    .item {
        float: left;
        padding: 16px;
        margin-right: 16px;
        margin-bottom: 16px;
        background-color: #fff;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }
    .date {
        margin-bottom: 16px;
        font-size: 24px;
    }
    .img {
        margin-top: 16px;
        img {
            margin-right: 8px;
        }
    }
}
@media all and (max-width: 750px){
    .weather-list {
        display: flex;
        .item {
            float: none;
        }
    }
}
</style>
