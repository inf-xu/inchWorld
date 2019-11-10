import VueRouter from 'vue-router'

import Login from './components/login/login.vue'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import TodoContainer from './components/tabbar/TodoContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'
import Voluntary from './components/home/Voluntary.vue'
import Electron from './components/home/Electron.vue'
import Physical from './components/user/Physical.vue'
import Score from './components/user/Score.vue'
import Book from './components/user/Book.vue'

const router = new VueRouter({
    routes: [ 
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/todo',
            component: TodoContainer
        },
        {
            path: '/user',
            component: UserContainer
        },
        {
            path: '/home/voluntary',
            component: Voluntary
        },
        {
            path: '/home/electron',
            component: Electron
        },
        {
            path: '/user/physical',
            component: Physical
        },
        {
            path: '/user/score',
            component: Score
        },
        {
            path: '/user/book',
            component: Book
        },

    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是 router-link-active
})

export default router