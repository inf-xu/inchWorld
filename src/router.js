import VueRouter from 'vue-router'

import Login from './components/login/login.vue'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'
import SyllbusContainer from './components/tabbar/SyllbusContainer.vue'
import RssContainer from './components/tabbar/RssContainer.vue'
import Voluntary from './components/home/Voluntary.vue'
import Electron from './components/home/Electron.vue'
import Physical from './components/user/Physical.vue'
import RssList from './components/rss/RssList.vue'
import RssDetail from './components/rss/RssDetail.vue'
import Score from './components/user/Score.vue'
import Book from './components/user/Book.vue'
import About from './components/user/About.vue'
import Privary from './components/user/Privary.vue'
import Collection from './components/user/Collection.vue'
import CustomRss from './components/user/CustomRss.vue'
import Setting from './components/user/Setting.vue'
import OtherWeb from './components/subcomponents/OtherWeb.vue'

const router = new VueRouter({
    routes: [ 
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login,
            meta:{keepAlive:false}
        },
        {
            path: '/home',
            component: HomeContainer,
            meta:{requireAuth:true, keepAlive: true}
        },
        {
            path: '/syllbus',
            component: SyllbusContainer,
            meta:{requireAuth:true, keepAlive: false}
        },
        {
            name: 'other',
            path: '/other',
            component: OtherWeb,
            meta:{requireAuth:false, keepAlive: false}
        },
        {
            path: '/rss',
            component: RssContainer,
            meta:{requireAuth:true, keepAlive: false}
        },
        {
            path: '/rsslist/:id',
            component: RssList,
            meta:{keepAlive:false}
        },
        {
            path: '/rssdetail/:name/:id',
            component: RssDetail,
            meta:{keepAlive:false}
        },
        { 
            path: '/user',
            component: UserContainer,
            meta:{requireAuth:true, keepAlive: true}
        },
        {
            path: '/collection',
            component: Collection,
            meta:{keepAlive:false}
        },
        {
            path: '/custom',
            component: CustomRss,
            meta:{keepAlive:false}
        },
        {
            path: '/set',
            component: Setting,
            meta:{keepAlive:true}
        },
        {
            path: '/home/voluntary',
            component: Voluntary,
            meta:{requireAuth:true, keepAlive: false}
        },
        {
            path: '/home/electron',
            component: Electron,
            meta:{keepAlive:true}
        },
        {
            path: '/user/physical',
            component: Physical,
            meta:{requireAuth:true, keepAlive: true}
        },
        {
            path: '/user/score',
            component: Score,
            meta:{requireAuth:true, keepAlive: true}
        },
        {
            path: '/user/book',
            component: Book,
            meta:{keepAlive:true}
        },
        {
            path: '/about',
            component: About,
            meta:{keepAlive: true}
        },
        {
            path: '/privary',
            component: Privary,
            meta:{keepAlive: true}
        },

    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是 router-link-active
})

export default router