<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <home-nav :name="'首页'"></home-nav>

    <!-- 卡片: 提示学生重要考试 -->
    <div class="mui-card nav-translate">
      <div class="mui-card-content">
        <div class="mui-card-content-inner strong-info" :style="{'background-color': themeColor}">
          距离考研还有
          <strong>{{ day }}</strong>天
        </div>
      </div>
    </div>

    <div style="margin-top: 90px;">
      <!-- 卡片: 教务系统 -->
      <div class="mui-card">
        <div class="mui-card-header">
          <span>教务系统</span>
          <div class="nav-weather">
            <img :src="weather.icon" alt="weather" />
            <span style="font-size:20px">{{weather.temperature}} ℃</span>
          </div>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-for="item in systemList" :key="item.url">
            <router-link :to="item.url">
              <span class="mui-icon iconfont" :class="item.icon"></span>
              <div class="mui-media-body">{{item.name}}</div>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 模态框 -->
      <mt-popup class="popup" v-model="tipShowFlag" popup-transition="popup-fade">
        <homeTip></homeTip>
      </mt-popup>

      <!-- 卡片: 提示 -->
      <div
        class="mui-card css-transform"
        @touchstart="longTimeTouch()"
        @touchend="emptyTime()"
        v-if="tipFlag"
        @click.prevent="tipShowFlag = !tipShowFlag"
      >
        <div class="mui-card-content-inner">
          <p>&nbsp;&nbsp;&nbsp; 感谢你下载使用《方寸》</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;目前小程序已经上线，微信小程序搜索"方寸教务"
            <br />&nbsp;&nbsp;&nbsp;&nbsp;长按删除这段文字，将不再出现。
          </p>
          <p
            style="font-weight: small; font-size: 10px;"
          >&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;提示&nbsp;&nbsp;创建于{{ todayTime }}</p>
        </div>
      </div>

      <!-- 每日一言 -->
      <div class="mui-card" :style="{'background-color': randomColor()}">
        <div class="mui-card-header">每日一言</div>
        <div class="mui-card-content one-content">
          <img :src="one.img" alt="one" />
          <span>{{one.text}}</span>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px; height: 50px"></div>
  </div>
</template>

<script>
import { Toast, MessageBox, Popup } from "mint-ui";
import homeTip from "../subcomponents/HomeTip.vue";
import homeNav from "../subcomponents/NavTabar.vue";
import {
  todayDate,
  RandomColor,
  checkImgExists,
  longTimeTouch
} from "../../common/utils.js";

export default {
  data() {
    return {
      flag: false,
      day: "",
      tipFlag: true,
      tipShowFlag: false,
      systemList: [
        {
          "url": "/syllbus",
          "icon": "icon-kebiaoxinxi",
          "name": "课 表"
        },{
          "url": "/home/voluntary",
          "icon": "icon-wj-zyzdj",
          "name": "义工时"
        },{
          "url": "/home/electron",
          "icon": "icon-dianfeimingan",
          "name": "电 费"
        },
      ],
      weather: {},
      one: {},
      todayTime: "",
      themeColor: "rgba(83, 30, 35, 0.8)"
    };
  },
  created() {
    const color = localStorage.getItem("themeColor");
    if (color != undefined) {
      this.themeColor = color;
    }
    this.getTodayInfo();
    this.todayTime = todayDate();
    const tip = localStorage.getItem("tipFlag");
    if (tip != undefined) {
      this.tipFlag = tip;
    }
    // this.getUserInfo();
    this.awayLast();
  },
  methods: {
    randomColor() {
      return RandomColor();
    },
    getTodayInfo() {
      this.$axios
        .get("api/today")
        .then(res => {
          if (res.data.status === 0) {
            this.weather = res.data.message.weather;
            this.one = res.data.message.one;
          }
        })
        .catch(err => {});
    },
    // 距离考研时间
    awayLast() {
      const now = new Date();
      const dayYear = now.getFullYear();
      let ky = new Date(dayYear + "-12-21");
      if (ky < now) {
        ky = new Date(dayYear + 1 + "-12-21");
      }
      this.day = Math.floor((ky - Date.parse(now)) / (1000 * 60 * 60 * 24)) + 1;
    },
    // 长按事件
    longTimeTouch(e) {
      return longTimeTouch(
        e,
        function() {
          //执行的代码块
          MessageBox.confirm("", {
            title: "提示",
            message: "删除过后将不会再出现,确认删除?",
            confirmButtonText: "确认",
            cancelButtonText: "取消"
          })
            .then(action => {
              if (action == "confirm") {
                this.tipFlag = false;
                localStorage.setItem("tipFlag", false);
              }
            })
            .catch(error => {});
        }.bind(this)
      );
    },
    // 长按结束清空定时器
    emptyTime() {
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
    }
  },
  components: {
    homeTip,
    homeNav
  }
};
</script>

<style lang="scss" scoped>
</style>