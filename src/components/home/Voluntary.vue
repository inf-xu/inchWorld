<template>
  <div class="vol-container">
    <!-- nav -->
    <header class="absolute-nav">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
          <span style="color: white; margin-left:25px;">义工时查询</span>
        </div>
      </div>
    </header>

    <div class="mui-slider mui-fullscreen">
      <div
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <li v-for="(time, index) in arr" :key="index" @click.prevent="showPopup(time)">
            <div class="swiper-content">
              <span class="icon iconfont icon-aixinfengxian"></span>
              <span>{{time}}</span>
              <p>{{getEncourage(index)}}</p>
            </div>
          </li>
        </div>
      </div>

      <div class="vol-detail">
        <div class="header-detail">
          <img src="../../assets/about-daisy.jpg" />
          <div class="user-detail">
            <span>你的义工记录</span>
            <p>为这个世界添上了颜色</p>
          </div>
        </div>
        <div class="footer-deatil">
          <img src="../../assets/volunteer.png" alt />
        </div>
      </div>
    </div>

    <mt-popup class="vol-popup" v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <div class="header-detail">
        <img src="../../assets/about-daisy.jpg" />
        <div class="user-detail">
          <span>你的义工记录</span>
          <p>你为这个世界添上了你的颜色</p>
        </div>
      </div>
      <div class="voluntary-content">
        <table class="table table-striped">
          <tr>
            <th>义工项目</th>
            <th>时间</th>
            <th>义工时</th>
          </tr>
          <tr v-for="(item, j) in showList" :key="j">
            <td>{{item.name}}</td>
            <td>{{item.time}}</td>
            <td>{{item.score}}</td>
          </tr>
        </table>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast, MessageBox, Popup } from "mint-ui";
import mui from "../../lib/mui/js/mui.min.js";
mui.init();
// mui.plusReady(function() {
mui(".mui-scroll-wrapper").scroll({
  bounce: false, //滚动条是否有弹力默认是true
  indicators: true //是否显示滚动条,默认是true
});
// });

export default {
  data() {
    return {
      voluntaryList: {},
      arr: [],
      showList: [],
      popupVisible: false
    };
  },
  created() {
    this.getVoluntaryList();
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      bounce: false, //滚动条是否有弹力默认是true
      indicators: true //是否显示滚动条,默认是true
    })
  },
  methods: {
    // 不能滚动，只能重新加载一遍
    goback() {
      this.$router.go(-1);
    },
    getVoluntaryList() {
      const user = {
        id: this.$store.state.userInfo.id
      };
      this.$http
        .post("api/voluntary", user)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            const data = JSON.parse(this.$aes.decrypt(res.body.message, key));
            if (data == null || data == '' || data == undefined) {
              return Toast("你还没有做过义工哦");
            }
            this.handleMsg(data);
          } else {
            Toast("义工时列表获取失败");
          }
        })
        .catch(err => {
          Toast("义工时列表获取失败");
        });
    },
    showPopup(time) {
      this.showList = this.voluntaryList[time];
      this.popupVisible = !this.popupVisible;
    },
    handleMsg(msg) {
      let i = 0;
      const o = {};
      const array = [];
      msg.forEach(item => {
        if (o[item.time.substring(0, 4)] != null) {
          o[item.time.substring(0, 4)].push(item);
        } else {
          o[item.time.substring(0, 4)] = [];
          array[i] = item.time.substring(0, 4);
          i++;
        }
      });
      this.arr = array;
      this.voluntaryList = o;
    },
    getEncourage(index) {
      let list = [
        "感谢你做的点点滴滴",
        "生活不止是不如意",
        "冬天到了,春天还会远吗",
        "一切都会过去的",
        "你就是全世界",
        "有你在真好"
      ];
      return list[index];
    }
  }
};
</script>

<style lang="scss" scoped>

</style>