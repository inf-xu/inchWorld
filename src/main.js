import Vue from 'vue'
// 由于一些原因，实在不想抽取子模块封装了，代码烂就烂吧
import VueRouter from 'vue-router'
import VueAMap from 'vue-amap'
VueAMap.initAMapApiLoader({
    key: 'your amap key',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
});
Vue.use(VueAMap);
Vue.use(VueRouter)
import './lib/mui/css/iconfont.css'
import store from './common/store.js'


import VueTouch from 'vue-touch'
Vue.use(VueTouch, {
    name: 'v-touch'
})


import app from './App.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://192.168.43.178:3000/'
Vue.http.options.emulateJSON = true

// 全局引入 加密文件
import aes from './common/aes.js'
Vue.prototype.$aes = aes

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'
import './common/style.scss'
import './common/pages.scss'
import './lib/mui/css/icons-extra.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.filter('dataFormat', function (dataStr) {
    return (dataStr + "").split('：')[1]
})


import router from './router.js'

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))["id"]) { 
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
});


const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})