<template>
  <div class="ssrDetail-container">
    <!-- nav -->
    <header class="absolute-nav" style="background-color: #51566A">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
          <span style="color: white; margin-left:25px;">{{content.name}}</span>
        </div>
        <div class="nav-right">
          <span
            class="mui-icon iconfont icon-shoucang1"
            style="margin-right:20px;"
            :class="{'coll': starFlag}"
            @click.prevent="collect()"
          ></span>
          <router-link to="/collection">
            <span class="mui-icon iconfont icon-liebiao"></span>
          </router-link>
        </div>
      </div>
    </header>

    <!-- title -->
    <div class="title nav-translate">
      <div>{{content.title}}</div>
      <span>{{content.author}}</span>
      <small>{{calculateDate(content.data)}}</small>
      <hr />
    </div>

    <div style="margin: 70px 5px 15px;">
      <hr />
    </div>

    <!-- content -->
    <div class="info" v-html="content.description"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import moment from "moment";

export default {
  data() {
    return {
      name: this.$route.params.name,
      id: this.$route.params.id,
      content: "",
      rssList: [],
      starFlag: ""
    };
  },
  created() {
    if (!localStorage.getItem(this.name)) {
      Toast("信息获取失败");
    } else {
      this.rssList = JSON.parse(localStorage.getItem(this.name));
      this.content = this.rssList[this.id];
      this.starFlag = this.content.star;
    }
  },
  mounted() {
    var links = document.querySelectorAll(".info a");
    Array.prototype.forEach.call(links, function(link) {
      link.addEventListener("click", function(e) {
        plus.runtime.openURL(this.href);
        e.preventDefault();
      });
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    calculateDate(date) {
      return moment()
        .format(date)
        .substring(0, 10);
    },
    collect() {
      this.starFlag = !this.starFlag;
      this.rssList[this.id].star = this.starFlag;
      localStorage.setItem(this.name, JSON.stringify(this.rssList));
      this.content.star = this.starFlag;
      // 加入/移除收藏夹
      this.$store.commit("handleCollect", this.content);
    }
  }
};
</script>

<style lang="scss">
</style>