<template>
  <div style="margin-top: 65px; padding: 10px;">
    <!-- 成绩 体测 图书 -->
    <div class="function-table">
      <router-link class="function-li" :to="item.url" v-for="item in systemList" :key="item.url">
        <span class="mui-icon iconfont" :class="item.icon" :style="{'color': randomColor()}"></span>
        <div class="mui-media-body">{{item.name}}</div>
      </router-link>
    </div>
    <!-- 小程序  博客 自定义  夜间模式 -->
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <span class="icon iconfont icon-xiaochengxu"></span>
          <span class="wei-item">小程序</span>
        </li>
        <li class="mui-table-view-cell">
          <router-link to="/collection">
            <span class="icon iconfont icon-shoucang"></span>
            <span class="wei-item">收藏</span>
          </router-link>
        </li>
        <li class="mui-table-view-cell" @click.prevent="goOtherWeb('https://KDaisyers.github.io')">
          <span class="icon iconfont icon-weibo"></span>
          <span class="wei-item">博客</span>
        </li>
        <li class="mui-table-view-cell">
          <router-link to="/custom">
            <span class="icon iconfont icon-18"></span>
            <span class="wei-item">自定义</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 设置  帮助 -->
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <router-link to="/set">
            <span class="icon iconfont icon-xinbaniconshangchuan-"></span>
            <span class="wei-item">设置</span>
          </router-link>
        </li>
        <li class="mui-table-view-cell" @click.prevent="openQQ()">
          <span class="icon iconfont icon-youjianxinjian"></span>
          <span class="wei-item">联系作者</span>
        </li>
      </ul>
    </div>

    <!-- 隐私  privary 关于 -->
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <router-link to="/privary">
            <span class="icon iconfont icon-yinsicelve"></span>
            <span class="wei-item">隐私</span>
          </router-link>
        </li>
        <li class="mui-table-view-cell">
          <router-link to="/about">
            <span class="icon iconfont icon-guanyu_o"></span>
            <span class="wei-item">关于</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RandomColor } from "../../common/utils.js";

export default {
  data() {
    return {
      systemList: [
        {
          url: "/user/score",
          icon: "icon-chengji-",
          name: "成绩"
        },
        {
          url: "/user/physical",
          icon: "icon-tiyu-paobu",
          name: "体测"
        },
        {
          url: "/user/book",
          icon: "icon-tushuguan",
          name: "图书"
        }
      ]
    };
  },
  methods: {
    randomColor() {
      return RandomColor();
    },
    openQQ() {
      // console.log("e.detail.value: " + JSON.stringify(e.detail.value));
      // 没有校验qq号是否为空或合法数字，如果不是可用的qq号，启动qq后会停留在qq主界面
      plus.runtime.openURL(
        "mqqwpa://im/chat?chat_type=wpa&uin=2891649549",
        function(res) {
          plus.nativeUI.alert("本机没有安装QQ，无法启动");
        }
      );
    },
    goOtherWeb(item) {
      //plus.runtime.openURL(item);
      this.$router.push({
        name: "other",
        params: {
          id: item
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>