<template>
    <div class="wrap">
        <div class="screen">
            <div class="up">{{ up }}</div>
            <div class="down">{{ down }}</div>
        </div>
        <div class="cal-row">
            <div class="cal-col col-green bg-grey" @click="input('(')">(</div>
            <div class="cal-col col-green bg-grey" @click="input(')')">)</div>
            <div class="cal-col col-green bg-grey" @click="input('%')">%</div>
            <div class="cal-col col-green bg-grey" @click="clear">C</div>
        </div>
        <div class="cal-row">
            <div class="cal-col" @click="input('7')">7</div>
            <div class="cal-col" @click="input('8')">8</div>
            <div class="cal-col" @click="input('9')">9</div>
            <div class="cal-col col-green bg-grey" @click="input('÷')">÷</div>
        </div>
        <div class="cal-row">
            <div class="cal-col" @click="input('4')">4</div>
            <div class="cal-col" @click="input('5')">5</div>
            <div class="cal-col" @click="input('6')">6</div>
            <div class="cal-col col-green bg-grey" @click="input('×')">×</div>
        </div>
        <div class="cal-row">
            <div class="cal-col" @click="input('1')">1</div>
            <div class="cal-col" @click="input('2')">2</div>
            <div class="cal-col" @click="input('3')">3</div>
            <div class="cal-col col-green bg-grey" @click="input('-')">-</div>
        </div>
        <div class="cal-row">
            <div class="cal-col" @click="input('0')">0</div>
            <div class="cal-col col-green large" @click="input('.')">·</div>
            <div class="cal-col col-green" @click="calculate">=</div>
            <div class="cal-col col-green bg-grey" @click="input('+')">+</div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                up: '',
                down: '',
            }
        },
        props: {
            exp: String
        },
        mounted() {
            this.up = this.exp
            this.down = this.calc(this.exp)
            this.hasInput = false
        },
        methods: {
            input(text) {
                if (!this.hasInput) {
                    this.down = text
                } else {
                    this.down += text
                }
                this.hasInput = true
            },
            clear() {
                this.down = this.up = ''
            },
            calculate() {
                let exp = this.down
                this.up = exp
                this.down = this.calc(exp)
            },
            calc(exp) {
                return core.calculate(exp.replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/'))
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrap {
    // width: 400px;
    // margin: 80px auto 0 auto;
}
.screen {
    height: 40px;
    margin-bottom: 4px;
    text-align: right;
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
