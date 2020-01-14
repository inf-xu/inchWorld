import Vue from 'vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueAMap from 'vue-amap'
VueAMap.initAMapApiLoader({
    key: 'your amap key',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
});
Vue.use(VueAMap);
Vue.use(VueRouter)
Vue.use(Vuex)

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

const store = new Vuex.Store({
    state: {
        userInfo: userInfo,
    },
    mutations: {
        setToken(state, token) {
            sessionStorage.setItem("token", token);
        },
        loginOut(state) {
            sessionStorage.clear();
            localStorage.removeItem('userInfo')
            state.userInfo = {}
        },
        addUserInfo(state, info) {
            state.userInfo.name = info.xm
            state.userInfo.zy = info.zymc
            state.userInfo.bj = info.bj
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        addUserId(state, user) {
            state.userInfo.id = user.name
            state.userInfo.password = user.password
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        addUserRome(state, rome) {
            state.userInfo.rome = rome
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        addUserPhysicall(state, phyPwd) {
            state.userInfo.phyPwd = phyPwd
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        }
    },
    getters: {
        token(state) {
            return sessionStorage.getItem("token")
        }
    }
})

import app from './App.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000/'
Vue.http.options.emulateJSON = true

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.filter('dataFormat', function (dataStr) {
    return dataStr.split('：')[1]
})

import router from './router.js'

const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})

/* 
?????????? -- ????
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { 
        if (sessionStorage.getItem("token")) { 
            next();
        } else {
            if (to.path === '/login') {
                next();
            } else {
                next({
                    path: '/login'
                })
            }
        }
    } else {
        next();
    }
    if (to.fullPath == "/login") {
        if (sessionStorage.getItem("token")) {
            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
}); */
