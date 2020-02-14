import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
const collection = JSON.parse(localStorage.getItem('collection') || '[]')
const rssList = [
    {
        name: "知乎",
        image: "https://www.zhihu.com/favicon.ico",
        title: "中文互联网最大的知识平台",
        id: "zhihu",
        subscribe: true
    },
    {
        name: "少数派",
        image: "https://cdn.sspai.com/sspai/assets/img/favicon/icon.ico",
        title: "高效工作,品质生活",
        id: "sspai",
        subscribe: true
    },
    {
        name: "微软亚洲",
        image: "https://c.s-microsoft.com/favicon.ico?v2",
        title: "微软亚洲研究院",
        id: "microsoft",
        subscribe: true
    },
    {
        name: "维基百科",
        image: "https://en.wikipedia.beta.wmflabs.org/static/favicon/wikipedia.ico",
        title: "自由的百科全书",
        id: "wiki",
        subscribe: true
    },
    {
        name: "果壳网",
        image: "https://1-im.guokr.com/ebs0F7w7eEl5yBTCG7kmKyOR2ha4no-cemrHXXwq1kGoAAAAcAAAAFBO.png",
        title: "科技有意思",
        id: "guokr",
        subscribe: true
    },
    {
        name: "极客公园",
        image: "https://imgslim.geekpark.net/geekpark-icon-196-03ac430f5643fc17aba3b3f5429a287d.png",
        title: "全球领先的商业创新思想平台",
        id: "geekpark",
        subscribe: true
    },
    {
        name: "36氪",
        image: "https://36kr.com/favicon.ico",
        title: "流媒体经济日报",
        id: "36k",
        subscribe: true
    },
    {
        name: "小众软件",
        image: "https://www.appinn.com/wp-content/uploads/cropped-Appinn-icon-512-32x32.png",
        title: "分享免费、小巧、实用。有趣、绿色的软件",
        id: "appinn",
        subscribe: true
    },
    {
        name: "好奇心日报",
        image: "http://www.qdaily.com/favicon.ico",
        title: "好奇驱动世界",
        id: "qdaily",
        subscribe: true
    },
    {
        name: "China Daily",
        image: "http://www.chinadaily.com.cn/favicon.ico",
        title: "International Headlines",
        id: "chinadaily",
        subscribe: true
    },
    {
        name: "腾讯",
        image: "https://www.qq.com/favicon.ico",
        title: "用户为本 科技向善",
        id: "qq",
        subscribe: true
    },
    {
        name: "摄影世界",
        image: "https://www.photoworld.com/favicon.ico",
        title: "有温度的专业影像媒体",
        id: "photoworld",
        subscribe: true
    },
    {
        name: "机核",
        image: "https://www.gcores.com/favicon.ico",
        title: "不止是游戏",
        id: "gcores",
        subscribe: true
    },
    {
        name: "糗事百科",
        image: "https://www.qiushibaike.com/favicon.ico",
        title: "天王盖地虎,小鸡炖蘑菇",
        id: "qiubai",
        subscribe: true
    },
    {
        name: "宅",
        image: "https://bilibili.com/favicon.ico",
        title: "宅男的福利",
        id: "zai",
        subscribe: true
    }
]

function reduceList(arr) {
    var hash = {};
    return arr.reduce(function (item, next) {
        hash[next.title] ? '' : hash[next.title] = true && item.push(next);
        return item
    }, [])
}

const state = {
    userInfo: userInfo,
    collection: collection,
    rssList: rssList
}
const mutations = {
    setKey(state, token) {
        const key = localStorage.getItem("key")
        if (key != undefined) {
            return;
        }
        localStorage.setItem("key", token);
    },
    loginOut(state) {
        sessionStorage.clear()
        localStorage.clear()
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
    },
    handleCollect(state, content) {
        let array = state.collection
        let index = -1
        for (let i = 0; i < array.length; i++) {
            if (content.title === array[i].title && content.link === array[i].link) {
                index = i
            }
        }
        if (index == -1) {
            array.push(content)
        } else {
            array.splice(index, 1)
        }
        localStorage.setItem('collection', JSON.stringify(array))
    },
    handleRssList(state, id) {
        let array = state.rssList
        if (localStorage.getItem('rssList')) {
            array = localStorage.getItem('rssList')
        }
        var newArr = array.filter(item => {
            return
        });
        localStorage.setItem('rssList', JSON.stringify(array))
    }
}
const getters = {
    key(state) {
        return localStorage.getItem("key")
    },
    collectList(state) {
        return localStorage.getItem("collection")
    },
    getTotalRssList(state) {
        if (localStorage.getItem('rssList')) {
            return JSON.parse(localStorage.getItem('rssList'))
        }
        return state.rssList
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})