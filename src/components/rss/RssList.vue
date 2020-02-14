<template>
  <div class="rssList-container">
    <!-- nav -->
    <header class="absolute-nav" style="background-color: #51566A">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
          <span style="color: white; margin-left:25px;">{{name}}</span>
        </div>
        <div class="nav-right">
          <span
            class="mui-icon iconfont icon-shuaxin"
            style="margin-right:20px;"
            @click.prevent="getSrrList()"
          ></span>
          <router-link to="/collection">
            <span class="mui-icon iconfont icon-liebiao"></span>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Rss List -->
    <mt-loadmore
      :auto-fill="false"
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      ref="loadmore"
      class="nav-translate"
    >
      <ul class="mui-table-view rssList-ul">
        <router-link
          class="mui-table-view-cell mui-media rss-flex"
          v-for="(item, index) in rssList"
          :key="index"
          :to="'/rssdetail/' + id + '/' + index"
        >
          <img class="mui-pull-right" :src="item.image" />
          <div class="rss-left">
            <div>{{item.title}}</div>
            <p>{{calculateDate(item.date)}}</p>
          </div>
        </router-link>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span
          v-show="topStatus !== 'loading'"
          class="icon iconfont icon-jiazai"
          :class="{ 'rotate': topStatus === 'drop' }"
        ></span>
        <span v-show="topStatus === 'loading'">finish!</span>
      </div>
    </mt-loadmore>

    <div style="height: 120px;"></div>
  </div>
</template>

<script>
import { Toast, Indicator, Loadmore, Spinner } from "mint-ui";
import moment from "moment";

export default {
  data() {
    return {
      id: this.$route.params.id,
      rssList: [],
      topStatus: "",
      name: ""
    };
  },
  created() {
    this.srrName();
    if (localStorage.getItem(this.id)) {
      this.rssList = JSON.parse(localStorage.getItem(this.id));
    } else {
      this.getSrrList();
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    goback() {
      this.$router.go(-1);
    },
    loadTop() {
      this.getSrrList();
      this.$refs.loadmore.onTopLoaded();
    },
    calculateDate(date) {
      return moment()
        .format(date)
        .substring(0, 10);
    },
    getSrrList() {
      Indicator.open();
      this.$http
        .get("api/srr/" + this.id)
        .then(res => {
          if (res.body.status === 0) {
            Indicator.close();
            this.rssList = JSON.parse(res.body.message);
            let webName = this.name;
            this.rssList.forEach(item => {
              item.name = webName;
            });
            localStorage.setItem(this.id, JSON.stringify(this.rssList));
          } else {
            Indicator.close();
            Toast("信息列表获取失败");
          }
        })
        .catch(err => {
          Indicator.close();
          Toast("信息列表获取失败");
        });
    },
    srrName() {
      let srrList = {
        "inchworld": "方寸",
        "zhihu": "知乎",
        "sspai": "少数派",
        "microsoft": "微软亚洲",
        "wiki": "维基百科",
        "guokr": "果壳网",
        "geekpark": "极客公园",
        "36k": "36氪",
        "appinn": "小众软件",
        "qdaily": "好奇心日报",
        "chinadaily": "China Daily",
        "qq": "腾讯科技",
        "dxy": "丁香园",
        "gcores": "机核",
        "photoworld": "摄影世界",
        "qiubai": "糗事百科",
        "zai": "宅"
      };
      this.name = srrList[this.id];
    }
  }
};
</script>

<style lang="scss" scoped>

</style>