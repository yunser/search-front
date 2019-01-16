<template>
    <section class="wh_container">
        <div class="wh_content_all">
            <div class="wh_top_changge">
                <li @click="PreMonth(myDate,false)">
                <div class="wh_jiantou1"></div>
                </li>
                <li class="wh_content_li">{{dateTop}}</li>
                <li @click="NextMonth(myDate,false)">
                <div class="wh_jiantou2"></div>
                </li>
            </div>
        <div class="week-box wh_content">
            <div class="wh_content_item" v-for="tag in textTop">
                <div class="wh_top_tag">
                    {{ tag }}
                </div>
            </div>
        </div>
        <div class="wh_content">
            <div class="calendar-grid" v-for="(item, index) in list"
                :class="[
                    { wh_isMark: item.isMark},
                    {wh_other_dayhide:item.otherMonth!=='nowMonth'},
                    {wh_want_dayhide:item.dayHide},
                    {wh_isToday:item.isToday},
                    {wh_chose_day:item.chooseDay},
                    setClass(item)
                ]"
                @click="clickDay(item,index)">
                <!-- <div class="wh_item_date" >
                </div> -->
                <div class="num">{{ item.id }}</div>
                <div class="lunar festival" :title="getText(item)">{{ getText(item) }}</div>
                <div class="work" v-if="item.work">班</div>
                <div class="lunar" v-if="item.lunar && !getText(item)">{{ item.lunar }}</div>
                <div class="holiday" v-if="item.holiday">休</div>
            </div>
        </div>
        </div>
    </section>
</template>

<script>
/* eslint-disable */
import timeUtil from "./calendar"
const CalendarConverter = window.CalendarConverter
const holidays = [
    '2018-01-01',
    '2018-02-15',
    '2018-02-16',
    '2018-02-17',
    '2018-02-18',
    '2018-02-19',
    '2018-02-20',
    '2018-02-21',
    '2018-04-05',
    '2018-04-06',
    '2018-04-07',
    '2018-04-29',
    '2018-04-30',
    '2018-05-01',
    '2018-06-16',
    '2018-06-17',
    '2018-06-18',
    '2018-09-22',
    '2018-09-23',
    '2018-09-24',
    '2018-10-01',
    '2018-10-02',
    '2018-10-03',
    '2018-10-04',
    '2018-10-05',
    '2018-10-06',
    '2018-10-07'
]
const works = [
    '2018-02-11',
    '2018-02-24',
    '2018-04-08',
    '2018-04-28',
    '2018-09-29',
    '2018-09-30'
]

export default {
    data() {
        return {
            myDate: [],
            list: [],
            historyChose: [],
            dateTop: ""
        };
    },
    props: {
        markDate: {
            type: Array,
            default: () => []
        },
        markDateMore: {
            type: Array,
            default: () => []
        },
        textTop: {
            type: Array,
            default: () => ["一", "二", "三", "四", "五", "六", "日"]
        },
        sundayStart: {
            type: Boolean,
            default: () => false
        },
        agoDayHide: { type: String, default: `0` },
        futureDayHide: { type: String, default: `2554387200` }
    },
    created() {
        this.intStart();
        this.myDate = new Date();
    },
    methods: {
        getText(item) {
            // console.log(item)
            let arr = item.date.split('/')
            let year = parseInt(arr[0])
            let month = parseInt(arr[1]) - 1
            let day = parseInt(arr[2])
            let str = null;

            var date = new Date();
            date.setFullYear(year, month, day);
            let lunar = new CalendarConverter().solar2lunar(date);
            if (lunar.solarFestival) {
                str = lunar.solarFestival;
            } else if (lunar.lunarFestival) {
                str = lunar.lunarFestival;
            } else if (lunar.solarTerms) {
                str = lunar.solarTerms;
            }
            return str; 
        },
        intStart() {
            timeUtil.sundayStart = this.sundayStart;
        },
        setClass(data) {
            let obj = {};
            obj[data.markClassName] = data.markClassName;
            return obj;
        },
        clickDay: function(item, index) {
            if (item.otherMonth === "nowMonth" && !item.dayHide) {
                this.getList(this.myDate, item.date);
            }
            if (item.otherMonth !== "nowMonth") {
                item.otherMonth === "preMonth"
                ? this.PreMonth(item.date)
                : this.NextMonth(item.date);
            }
        },
        ChoseMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = new Date(date);
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        PreMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        NextMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        forMatArgs() {
            let markDate = this.markDate;
            let markDateMore = this.markDateMore;
            markDate = markDate.map(k => {
                return timeUtil.dateFormat(k);
            });
            markDateMore = markDateMore.map(k => {
                k._date = k.date
                k.date = timeUtil.dateFormat(k.date);
                return k;
            });
            return [markDate, markDateMore];
        },
        getList(date, chooseDay, isChosedDay = true) {
            const [markDate, markDateMore] = this.forMatArgs();
            this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
            let arr = timeUtil.getMonthList(this.myDate);
            for (let i = 0; i < arr.length; i++) {
                let markClassName = "";
                let k = arr[i];
                k.chooseDay = false;
                const nowTime = k.date;
                const t = new Date(nowTime).getTime() / 1000;
                //看每一天的class
                for (const c of markDateMore) {
                    if (c.date === nowTime) {
                        markClassName = c.className || "";
                    }
                }
                //标记选中某些天 设置class
                k.markClassName = markClassName;
                k.isMark = markDate.indexOf(nowTime) > -1;
                //无法选中某天
                k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
                if (k.isToday) {
                    this.$emit("isToday", nowTime);
                }
                let flag = !k.dayHide && k.otherMonth === "nowMonth";
                if (chooseDay && chooseDay === nowTime && flag) {
                    this.$emit("choseDay", nowTime);
                    this.historyChose.push(nowTime);
                    k.chooseDay = true;
                } else if (
                this.historyChose[this.historyChose.length - 1] === nowTime &&
                    !chooseDay && flag
                ) {
                    k.chooseDay = true;
                }
            }
            this.list = arr;
            for (let i = 0; i < this.list.length; i++) {
                // let date = this.list.date.split('/')
                let m = moment(this.list[i].date, 'YYYY/MM/DD')
                let timeStr = m.format('YYYY-MM-DD')
                for (let holiday of holidays) {
                    if (timeStr === holiday) {
                        this.list[i].holiday = true
                    }
                }
                if (this.list[i].holiday) {
                    continue
                }
                for (let work of works) {
                    if (timeStr === work) {
                        this.list[i].work = true
                    }
                }
                // 农历
                let lunar = new CalendarConverter().solar2lunar(m.toDate())
                this.list[i].lunar = lunar.lunarDay === '初一' ? (lunar.lunarMonth + '月') : lunar.lunarDay
                // if (this.)
            }
            console.log('list', this.list)
        }
    },
    mounted() {
        this.getList(this.myDate);
    },
    watch: {
        markDate: {
        handler(val, oldVal) {
            this.getList(this.myDate);
        },
        deep: true
        },
        markDateMore: {
        handler(val, oldVal) {
            this.getList(this.myDate);
        },
        deep: true
        },
        agoDayHide: {
        handler(val, oldVal) {
            this.agoDayHide = parseInt(val);
            this.getList(this.myDate);
        },
        deep: true
        },
        futureDayHide: {
        handler(val, oldVal) {
            this.futureDayHide = parseInt(val);
            this.getList(this.myDate);
        },
        deep: true
        },
        sundayStart: {
        handler(val, oldVal) {
            this.intStart();
            this.getList(this.myDate);
        },
        deep: true
        }
    }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 460px) {
}

.wh_container {
    max-width: 410px;
    margin: auto;
}

li {
    list-style-type: none;
}
.wh_top_changge {
    display: flex;
}

.wh_top_changge li {
    cursor: pointer;
    display: flex;
    /* color: #fff; */
    font-size: 18px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 47px;
}

.wh_top_changge .wh_content_li {
    cursor: auto;
    flex: 2.5;
}
.wh_content_all {
    width: 100%;
    overflow: hidden;
    border: 1px solid #eee;
}

.wh_content {
    display: flex;
    flex-wrap: wrap;
}
.wh_content_item {
    width: 14.285714%;
}
.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .calendar-grid {
  color: #ddd;
  font-size: 16px;
}

.calendar-grid,
.wh_content_item_tag {
    font-size: 15px;
    width: 14.285714%;
    flex-shrink: 0;
    text-align: center;
    /* color: #fff; */
    position: relative;
    padding: 4px 0;
    border-bottom: 1px solid #ccc;
}


.wh_top_tag {
  width: 48px;
  height: 48px;
  line-height: 48px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 48px;
  height: 48px;
//   line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #999;
  border-left: 2px solid #999;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #999;
  border-right: 2px solid #999;
  transform: rotate(45deg);
}
.calendar-grid {
    height: 56px;
    color: #333;
    border: 1px solid #eee;
    .wh_other_dayhide {
        color: #bfbfbf;
    }
    .wh_want_dayhide {
        color: #bfbfbf;
    }
    .wh_isToday {
        line-height: 48px;
        // background: green;
        // color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
    }
    &:hover {
        // line-height: 48px;
        background: rgba(66, 133, 245, 0.6);
        color: #fff;
        cursor: pointer;
        // border-radius: 50%;
    }
    &.wh_chose_day {
        color: #fff;
        background: #4285f4;
        // border-radius: 100px;
    }
    .num {
        padding-top: 8px;
        text-align: center;
        font-size: 16px;
    }
    .work {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        background-color: #555;
        width: 16px;
        line-height: 16px;
        font-size: 12px;
        text-align: center;
    }
    .holiday {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        background-color: #f00;
        width: 16px;
        line-height: 16px;
        font-size: 12px;
        text-align: center;
    }
    .lunar {
        width: 48px;
        color: #999;
        font-size: 12px;
        white-space: nowrap;
        // text-overflow: 
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding-left: 4px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .festival {
        color: rgb(238, 105, 105);
    }
}
.calendar-grid > .wh_isMark {
    margin: auto;
    border-radius: 100px;
    background: blue;
    z-index: 2;
}

.week-box {
    border-bottom: 1px solid #eee;
}
</style>