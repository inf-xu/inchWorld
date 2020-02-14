<template>
  <div class="collection-container">
    <header class="absolute-nav">
      <div class="home-nav">
        <div class="nav-left">
          <span>收藏夹</span>
        </div>
        <div class="nav-right">
          <router-link to="/set">
            <span class="mui-icon iconfont icon-xinbaniconshangchuan-" style="font-size: 26px;"></span>
          </router-link>
        </div>
      </div>
    </header>

    <!-- 轮播图 -->
    <mt-swipe :auto="4000" :show-indicators="false" class="mui-card nav-translate coll-swipe">
      <mt-swipe-item>
        <a href="#">
          <img src="https://wallpapershome.com/images/pages/ico_h/22437.jpg" />
          <p class="mui-slider-title">欢迎来到收藏夹的世界</p>
        </a>
      </mt-swipe-item>
      <mt-swipe-item v-for="(item, index) in content" :key="index">
        <a href="#">
          <img :src="checkImgExists(item.image)" />
          <p class="mui-slider-title">{{item.title}}</p>
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <div class="collection-list">
      <div class="mui-card collection-item" @click.prevent="goOtherWeb('https://daisylike.top/2020/02/13/2020-02-13-%E3%80%8A%E6%96%B9%E5%AF%B8%E3%80%8B%E6%94%B6%E8%97%8F%E5%A4%B9%E4%BD%BF%E7%94%A8/')">
        <img
          class="mui-card-header mui-card-media"
          src="https://wallpapershome.com/images/pages/ico_h/22437.jpg"
        />
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p style="color: #333;">打开方寸收藏的正确方式</p>
            <div class="inner-footer">
              <a class="mui-card-link">方寸</a>
              <a class="mui-card-link">
                <span class="icon iconfont icon-diandian"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card collection-item" v-for="(item, index) in content" :key="index">
        <img class="mui-card-header mui-card-media" :src="checkImgExists(item.image)" />
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p style="color: #333;">{{ item.title }}</p>
            <div class="inner-footer">
              <a class="mui-card-link">{{item.name}}</a>
              <a class="mui-card-link">
                <span class="icon iconfont icon-diandian" @click.prevent="cancelStar(item)"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, MessageBox } from "mint-ui";

export default {
  data() {
    return {
      collTip: true,
      content: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    goOtherWeb(item) {
      //plus.runtime.openURL(item);
      this.$router.push({
        name: "other",
        params: {
          id: item
        }
      });
    },
    init() {
      if (localStorage.getItem("collection")) {
        this.content = JSON.parse(localStorage.getItem("collection"));
      }
    },
    checkImgExists(imgurl) {
      var ImgObj = new Image(); //判断图片是否存在
      ImgObj.src = imgurl;
      //存在图片
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return imgurl;
      } else {
        
        return require('../../assets/load.png');
      }
    },
    cancelStar() {
      MessageBox.confirm("", {
        title: "提示",
        message: "确认取消收藏?",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            this.$store.commit("handleCollect", this.content);
            this.init()
          }
        })
        .catch(error => {});
    }
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  }
};
</script>

<style lang="scss" scoped>

</style>