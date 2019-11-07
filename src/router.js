import VueRouter from 'vue-router'

import Login from './components/login/login.vue'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import TodoContainer from './components/tabbar/TodoContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'
import Voluntary from './components/home/Voluntary.vue'

const router = new VueRouter({
    routes: [ // 配置路由规则
        {
            path: '/',
            redirect: '/HomeContainer'
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

    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是 router-link-active
})

export default router