<template>
  <div class="score-class">
    <!-- nav -->
    <header class="absolute-nav">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
          <span style="margin-left:25px;">成绩查询</span>
        </div>
        <div class="nav-right">
          <span class="icon iconfont icon-bangzhu" @click.prevent="tip()"></span>
        </div>
      </div>
    </header>

    <div class="mui-slider mui-fullscreen" style="background-color: #f2f1f6;">
      <div
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <li
            class="score-li"
            v-for="(time, index) in arr"
            :key="index"
            @click.prevent="showPopup(index)"
          >
            <div class="swiper-content">
              <span class="icon iconfont icon-cz-cjdj"></span>
              <span>{{time}}</span>
            </div>
          </li>
        </div>
      </div>

      <div class="vol-detail">
        <div class="header-detail">
          <img src="../../assets/about-daisy.jpg" />
          <div class="user-detail">
            <span>你的成绩单</span>
            <p>给自己交上了满意的答卷</p>
          </div>
        </div>
        <v-chart class="my-chart" :options="bar" />
      </div>
    </div>

    <mt-popup class="popup" v-model="popupVisible" position="right" popup-transition="popup-fade">
      <div class="score-popup" v-for="(item, index) in scoreList" :key="index">
        <div class="score-li right-chat">
          <span>{{item.kcmc}}</span>
        </div>
        <div class="score-li left-chat">
          <span>{{item.kclbmc}}课,占学分{{item.xf}},你的成绩是{{item.zcj}}</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import mui from "../../lib/mui/js/mui.min.js";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
mui.init();

export default {
  data() {
    return {
      totalScoreList: [],
      popupVisible: false,
      arr: [],
      scoreList: [],
      bar: {
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "总成绩",
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.getScoreList();
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      bounce: false, //滚动条是否有弹力默认是true
      indicators: true //是否显示滚动条,默认是true
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    tip() {
      Toast({
        message: "方寸:下方的图表是各学期学分总和",
        position: "center",
        duration: 5000
      });
    },
    handleScore(totalList) {
      const array = []; // get 学期列表
      const totalCredit = [];
      let temp = 0;
      totalList.forEach(item => {
        temp = 0;
        array.push(item[0].xqmc);
        item.forEach(i => {
          temp += i.xf;
        });
        totalCredit.push(temp);
      });
      this.arr = array;
      this.bar.xAxis.data = totalCredit;
      this.bar.series[0].data = totalCredit;
    },

    showPopup(index) {
      this.popupVisible = true;
      this.scoreList = this.totalScoreList[index];
    },
    getScoreList() {
      const id = this.$store.state.userInfo.id;
      const data = {
        id: id,
        updateFlag: this.isUpdate()
      };
      this.$http
        .post("api/system", data)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            // console.log(this.$aes.decrypt(res.body.message, key));
            
            this.totalScoreList = JSON.parse(this.$aes.decrypt(res.body.message, key));
            // this.totalScoreList = JSON.parse(res.body.message, key)
            
            this.handleScore(this.totalScoreList);
          }
        })
        .catch(err => {
          Toast("查成绩的同学太多了,请稍后再试");
        });
    },
    isUpdate() {
      const today = new Date();
      const year = today.getFullYear();
      const lowTime1 = new Date(year + "-12-10");
      const highTime1 = new Date(year + "-12-29");
      const lowTime2 = new Date(year + "-8-10");
      const highTime2 = new Date(year + "-8-20");

      if (today > lowTime1 && today < highTime1) {
        return true;
      } else if (today > lowTime2 && today < highTime2) {
        return true;
      }
      return false;
    }
  },
  components: {
    "v-chart": ECharts
  }
};
</script>

<style lang="scss" scoped>

</style>