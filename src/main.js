import Vue from 'vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)

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

import router from './router.js'
const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
})  