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
            redirect: '/home'
        },
        {
            path: '/login',
            component: Login,
            meta:{requireAuth:false,keepAlive:false}
        },
        {
            path: '/home',
            component: HomeContainer,
            meta:{requireAuth:false, keepAlive: true}
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
            meta:{requireAuth:false, keepAlive: false}
        },
        {
            path: '/rsslist/:id',
            component: RssList,
            meta:{requireAuth:false,keepAlive:false}
        },
        {
            path: '/rssdetail/:name/:id',
            component: RssDetail,
            meta:{requireAuth:false,keepAlive:false}
        },
        { 
            path: '/user',
            component: UserContainer,
            meta:{requireAuth:true, keepAlive: true}
        },
        {
            path: '/collection',
            component: Collection,
            meta:{requireAuth:false,keepAlive:false}
        },
        {
            path: '/custom',
            component: CustomRss,
            meta:{requireAuth:false,keepAlive:false}
        },
        {
            path: '/set',
            component: Setting,
            meta:{requireAuth:false,keepAlive:true}
        },
        {
            path: '/home/voluntary',
            component: Voluntary,
            meta:{requireAuth:true, keepAlive: false}
        },
        {
            path: '/home/electron',
            component: Electron,
            meta:{requireAuth:false,keepAlive:true}
        },
        {
            path: '/user/physical',
            component: Physical,
            meta:{requireAuth:true, keepAlive: false}
        },
        {
            path: '/user/score',
            component: Score,
            meta:{requireAuth:true, keepAlive: false}
        },
        {
            path: '/user/book',
            component: Book,
            meta:{requireAuth:false,keepAlive:true}
        },
        {
            path: '/about',
            component: About,
            meta:{requireAuth:false,keepAlive: true}
        },
        {
            path: '/privary',
            component: Privary,
            meta:{requireAuth:false,keepAlive: true}
        },

    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是 router-link-active
})

export default router