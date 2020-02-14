<template>
  <div class="app-container">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <nav class="mui-bar mui-bar-tab mui-active" v-show="isOriginHei">
      <router-link class="mui-tab-item-llb" to="/home">
        <span
          class="mui-icon iconfont icon-yidiandiantubiao04"
          :class="{'mui-active': (path === '/home' ? true : false)}"
        ></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/rss">
        <span
          class="mui-icon iconfont icon-dongtai01"
          :class="{'mui-active': (path === '/rss' ? true : false)}"
        ></span>
        <span class="mui-tab-label">订阅</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/syllbus">
        <span
          class="mui-icon iconfont icon-paikebiao"
          :class="{'mui-active': (path === '/syllbus' ? true : false)}"
        ></span>
        <span class="mui-tab-label">课表</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/user">
        <span
          class="mui-icon iconfont icon-touxiang"
          :class="{'mui-active': (path === '/user' ? true : false)}"
        ></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import mui from "./lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      path: this.$route.path,
      isOriginHei: true,
      screenHeight: document.documentElement.clientHeight, //此处也可能是其他获取方法
      originHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    let self = this;
    window.onresize = function() {
      return (function() {
        self.screenHeight = document.documentElement.clientHeight;
      })();
    };
  },
  created() {
    let path = this.$route.path;
    if (path === "/login" || path === "/set") {
      this.isOriginHei = false;
    }
  },
  watch: {
    "$route.path": function(newVal) {
      // console.log(newVal);
      this.path = newVal;
      if (newVal === "/login" || newVal === "/set") {
        this.isOriginHei = false;
      } else {
        this.isOriginHei = true;
      }
    },
    screenHeight(val) {
      if (this.originHeight > val + 100) {
        //加100为了兼容华为的返回键
        this.isOriginHei = false;
      } else if (this.$route.path !== "/login") {
        this.isOriginHei = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>


.app-container {
  padding-bottom: 50px;
  width: 100%;
  height: 100%;
  // overflow-x: auto;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
}

.mui-bar {
  background-color: #fff;
  position: fixed;
  bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-active {
  // color: #007aff;
  // color: #1aad19;
  color: black;
}

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: gray;
  // color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 10px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
}
</style>