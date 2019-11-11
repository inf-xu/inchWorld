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

const store = new Vuex.Store({
    state: {
        userInfo: {
            id: '',
            name: '',
            zy: ''
        }
    },
    mutations: {
        addUserInfo(state, info) {
            state.userInfo.name = info.xm
            state.userInfo.zy = info.zymcy
        },
        addUserId(state, id) {
            state.userInfo.id = id
        }
    },
    getters: {
        getUserInfo(state) {
            return id = state.userInfo.id
        }
    }
})

import app from './App.vue'
//import app from './components/login/login.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000'
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