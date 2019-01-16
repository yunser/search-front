<template>
    <div class="wrap">
        <div class="body">
            <div class="coin" :style="{transform: `rotateY(${deg}deg)`}">
                {{ result }}
            </div>
        </div>
        <div class="footer">
            <ui-raised-button label="重试" @click="retry" />
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                deg: 0,
                result: '正面',
            }
        },
        props: {
        },
        mounted() {
        },
        methods: {
            retry(text) {
                this.result = Math.random() > 0.5 ? '正面' : '反面'
                this.deg = 0
                let timer = window.setInterval(() => {
                    this.deg += 20
                    if (this.deg > 360 * 3) {
                        this.deg = 0
                        window.clearInterval(timer)
                    }
                }, 10)
            },
        }
    }
</script>

<style lang="scss" scoped>
.body {
    padding: 16px;
    // font-size: 32px;
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
