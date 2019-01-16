<template>
    <div>
        <!-- <div class="detail-box">
            <div class="left">
                <ui-date-picker v-model="curDate" />
                <div>{{ detail.dateAndWeek }}</div>
                <div class="day">{{ detail.date }}</div>
            </div>
            <div class="info">
                <div class="info">{{ detail.lunarDate }}</div>
                <div class="info">{{ detail.lunarYear }}</div>
                <div class="info">{{ detail.lunarDate2 }}</div>
            </div>
        </div> -->
        <calendar
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            ref="calendar"
            ></calendar>
        <!-- <ui-float-button class="btn-today" v-if="!isToday" @click="gotoToday">今</ui-float-button> -->
    </div>
</template>

<script>
    /* eslint-disable */
    const CalendarConverter = window.CalendarConverter
    const moment = window.moment
    
    export default {
        data () {
            return {
                curDate: '2018-10-01',
                year: 2018,
                month: 10,
                date: 3,
                detail: {},
            }
        },
        computed: {
            isToday() {
                let now = new Date()
                return this.year === now.getFullYear() && this.month === now.getMonth() &&
                    this.date === now.getDate()
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                console.log('gotoToday')
                this.gotoToday()
            },
            selectDate(year, month, day) {
                this.year = year
                this.month = month
                this.date = day

                let date = new Date()
                date.setFullYear(year, month, day)
                let lunar = new CalendarConverter().solar2lunar(date)
                this.detail = {
                    dateAndWeek: `${year}-${month + 1}-${day} 星期${lunar.week}`,
                    date: day,
                    lunarDate: `${lunar.lunarMonth}月${lunar.lunarDay}`,
                    lunarYear: `${lunar.cYear}年 【${lunar.lunarYear}年】`,
                    lunarDate2: `${lunar.cMonth}月 ${lunar.cDay}日`
                }
            },
            clickDay(data) {
                let arr = data.split('/')
                this.selectDate(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]))
            },
            gotoToday() {
                console.log(this.$refs.calendar)
                let date = new Date()
                this.selectDate(date.getFullYear(), date.getMonth(), date.getDate())
                this.$refs.calendar.ChoseMonth(moment().format('YYYY-MM-DD'))
            },
            changeDate(data) {
                console.log(data); //左右点击切换月份
            },
            clickToday(data) {
                
                console.log(data); //跳到了本月
            }
        },
        watch: {
            curDate(value) {
                this.curDate = value
                let arr = this.curDate.split('-')
                let date = new Date()
                date.setFullYear(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]))
                this.selectDate(date.getFullYear(), date.getMonth(), date.getDate())
                this.$refs.calendar.ChoseMonth(moment(date).format('YYYY-MM-DD'))
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';
.page-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.detail-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    margin-top: 16px;
    padding: 16px;
    background-color: #4285f4;
    // border-radius: 4px;
    color: #fff;
    .day {
        width: 80px;
        height: 80px;
        // margin: 0 auto 16px auto;
        font-size: 32px;
        text-align: center;
        line-height: 80px;
        background-color: #ffb800;
        border-radius: 4px;
    }
}
.container {
    width: 400px;
    margin: 0 auto;
}
.btn-today {
    position: fixed;
    right: 24px;
    bottom: 24px;
}
</style>
