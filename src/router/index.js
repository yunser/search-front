import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Search = resolve => require(['@/views/Search'], resolve)
const Submit = resolve => require(['@/views/Submit'], resolve)
const Log = resolve => require(['@/views/Log'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)
const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    { path: '/admin', component: resolve => require(['@/views/Admin'], resolve) },
    { path: '/searchItems/:id', component: resolve => require(['@/views/SearchItemEdit'], resolve) },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/submit',
        component: Submit
    },
    {
        path: '/log',
        component: Log
    },
    {
        path: '/oauth/callback',
        component: OauthCallback
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
