<template>
    <div class="wrap">
        <div class="body">
            {{ timeText }}
        </div>
        <div class="footer">
            <ui-raised-button label="开始" @click="start" />
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                timeText: '00:00',
            }
        },
        props: {
        },
        mounted() {
            // this.start()
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        methods: {
            start() {
                this.startTime = new Date().getTime()
                this.timer = window.setInterval(() => {
                    let time = new Date().getTime() - this.startTime
                    const SECOND = 1000
                    let MINUTE = 60 * 1000
                    let HOUR = 60 * MINUTE
                    let minute = '' + Math.floor(time / MINUTE)
                    let second = '' + Math.floor((time - minute * MINUTE) / SECOND)
                    console.log(time, minute, second)
                    this.timeText = `${('' + minute).padStart(2, '0')}:${('' + second).padStart(2, '0')}`
                }, 1000)
            },
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
.coin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #333;
    background-color: #f1f1f1;
    font-size: 24px;
}
.up {
    height: 20px;
    color: #666;
}
.down {
    font-size: 16px;
    font-weight: bold;
}
.cal-row {
    display: flex;
}
.cal-col {
    width: 25%;
    height: 48px;
    text-align: center;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    line-height: 48px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        background-color: #f9f9f9;
    }
}
.col-green {
    color: #f60;
}
.bg-grey {
    background-color: #f9f9f9;
}
.large {
    font-size: 24px;
}
</style>
