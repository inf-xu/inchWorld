import VueRouter from 'vue-router'

import Login from './components/login/login.vue'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import TodoContainer from './components/tabbar/TodoContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'
import Voluntary from './components/home/Voluntary.vue'
import Electron from './components/home/Electron.vue'
import Syllabus from './components/home/Syllabus.vue'
import Physical from './components/user/Physical.vue'
import Score from './components/user/Score.vue'
import Book from './components/user/Book.vue'
import About from './components/user/About.vue'
import Edit from './components/user/Edit.vue'
import Privary from './components/user/Privary.vue'

const router = new VueRouter({
    routes: [ 
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: HomeContainer,
            meta:{requireAuth:true}
        },
        {
            path: '/todo',
            component: TodoContainer,
            meta:{requireAuth:true}
        },
        {
            path: '/user',
            component: UserContainer,
            meta:{requireAuth:true}
        },
        {
            path: '/home/voluntary',
            component: Voluntary,
        },
        {
            path: '/home/syllabus',
            component: Syllabus
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
            path: '/user/edit',
            component: Edit
        },
        {
            path: '/user/book',
            component: Book
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/privary',
            component: Privary
        },

    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是 router-link-active
})

export default router