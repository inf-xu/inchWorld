<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <header class="absolute-nav" style="background-color: #f2f1f6;">
      <div class="user-nav">
        <router-link to="/set">
          <span class="mui-icon iconfont icon-settings"></span>
        </router-link>
      </div>
    </header>

    <!-- 个人信息 -->
    <div class="user-info nav-translate">
      <img src="../../assets/about-daisy.jpg" @click="imageShowFlag=true" />
      <div class="user-right">
        <div class="mui-media-body">
          {{ user.xm }}
          <span>{{ user.zymc }}</span>
        </div>
        <div>
          <span class="icon iconfont icon-Group-" @click.prevent="QRShowFlag=true"></span>
          <span class="icon iconfont icon-xiangyou"></span>
        </div>
      </div>
    </div>

    <mt-popup class="popup" v-model="QRShowFlag" popup-transition="popup-fade">
      <h3>你的个人信息</h3>
      <p>截图保存二维码,微信扫一扫</p>
      <!--canvas中的二维码-->
      <div id="qrcode" ref="qrcode" style="display: none;"></div>
      <div id="wecode" name="canvas"></div>
    </mt-popup>

    <mt-popup
      v-model="imageShowFlag"
      class="image-popup"
      position="bottom"
      popup-transition="popup-fade"
    >
      <div class="header-detail">
        <img src="../../assets/about-daisy.jpg" />
        <div class="user-detail">
          <span>个人主页</span>
          <p>白马清欢无别事,我在等风也等你</p>
        </div>
      </div>
      <mt-button
        type="primary"
        size="large"
        style="margin-top: 20px"
        @click.prevent="loginout()"
      >退出登陆</mt-button>
    </mt-popup>

    <user-list></user-list>

    <div style="height: 40px"></div>
  </div>
</template>

<script>
import { Toast, Popup, MessageBox } from "mint-ui";
import html2canvas from "html2canvas";
import mui from "../../lib/mui/js/mui.min.js";
import userList from "../subcomponents/userList.vue";
import QRCode from "qrcodejs2";
mui.init();

export default {
  data() {
    return {
      user: {},
      QRShowFlag: false,
      imageShowFlag: false,
    };
  },
  created() {
    this.getUserInfo();
    this.$nextTick(() => {
      this.qrcode();
    });
  },
  methods: {
    getUserInfo() {
      this.user = {
        xm: this.$store.state.userInfo.name,
        zymc: this.$store.state.userInfo.zy
      };
    },
    qrcode() {
      const xh = this.$store.state.userInfo.id;
      let qrcode = new QRCode("qrcode", {
        width: 200,
        height: 200,
        text: "https://www.kdaisyers.com/qrcode/" + xh
      });
      var mycanvas1 = document.getElementsByTagName("canvas")[0]; //将转换后的img标签插入到html中
      var img = this.convertCanvasToImage(mycanvas1);
      document.querySelector("#wecode").append(img); //imgDiv表示你要插入的容器id
    },
    convertCanvasToImage(canvas) {
      //新Image对象，可以理解为DOM
      var image = new Image(); // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持 // 指定格式PNG
      image.src = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      return image;
    },
    loginout() {
      this.$axios
        .get("api/loginout")
        .then(res => {
          if (res.data.status === 0) {
            Toast("退出成功");
            this.$store.commit("loginOut");
            this.$router.push("/home");
          }
        })
        .catch(err => {
          Toast("退出失败");
        });
    }
  },
  components: {
    userList
  }
};
</script>

<style lang="scss" scoped>
</style>