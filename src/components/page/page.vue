<template>
    <ui-page :title="title || page.title" :page="page" :backable="backable" ref="page">
        <div slot="drawer">
            <div class="header">
                <img class="logo" src="https://icons.yunser.com/icons/search.svg">
            </div>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="首页" to="/">
                    <ui-icon slot="left" value="home"/>
                </ui-list-item>
                <ui-list-item title="帮助" href="https://project.yunser.com/articles/97f60ee0ea6211e8b72a8f73ced57134" target="_blank">
                    <ui-icon slot="left" value="help"/>
                </ui-list-item>
                <ui-list-item title="搜索记录" to="/log">
                    <ui-icon slot="left" value="history"/>
                </ui-list-item>
                <ui-list-item title="收录提交" to="/submit">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="关于" href="https://project.yunser.com/products/9f482d30e8f111e8910a6b4ca8a9ec68" target="_blank">
                    <ui-icon slot="left" value="info"/>
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggle() {
                console.log(this.$refs.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    padding: 64px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.logo {
    display: block;
    width: 80px;
    margin: 0 auto;
}
.ui-position-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>
