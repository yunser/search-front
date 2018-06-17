<template>
    <my-page title="搜索">
        <div class="wrap">
            <img class="logo" src="/static/img/yunser.svg">
            <div class="search-box">
                <input class="input" v-model="keyword" placeholder="">
                <ui-icon-button icon="search" title="搜索" primary @click="search" />
            </div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                keyword: ''
            }
        },
        methods: {
            search() {
                if (!this.keyword) {
                    this.$message({
                        type: 'danger',
                        text: '请输入关键词'
                    })
                    return
                }
                if (this.keyword.match(/^[0-9]+$/)) {
                    // alert('数字')
                }
                this.$router.push('/search?keyword=' + this.keyword)
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrap {
    width: 400px;
    margin: 80px auto 0 auto;
}
.search-box {
    display: flex;
    width: 400px;
    // border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
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
.logo {
    display: block;
    margin: 0 auto 24px auto;
    max-width: 240px;
}
</style>
