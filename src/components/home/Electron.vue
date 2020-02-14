<template>
  <div class="electron-container">
    <!-- nav -->
    <header class="absolute-nav">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
        </div>
        <div class="nav-right">
          <div class="search bar8" @click.prevent="popupVisible=false">
            <form>
              <input type="text" v-model="name" @keyup.enter="getElectricbill()" placeholder="电费查询" />
              <button type="button">
                <span class="mui-icon iconfont icon-sousuo" style="font-weight: bold"></span>
              </button>
            </form>
          </div>
          <span
            class="icon iconfont icon-bangzhu"
            @click.prevent="tip()"
            style="margin-left: 10px;"
          ></span>
        </div>
      </div>
    </header>

    <div class="nav-translate" style="height: 80px;"></div>

    <mt-popup
      class="popup"
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
      :style="{'height': popHeight}"
    >
      <h4>提示</h4>
      <p>请输入房间名，格式为"15-203"，小横杠为英文横杠噢.</p>
      <div class="mui-card" v-show="flag">
        <div class="mui-card-header">{{name}}的电费情况</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <span>基本账户:</span>
                <span>{{ electricbill.base }}</span>
              </li>
              <li class="mui-table-view-cell">
                <span>电费补助:</span>
                <span>{{ electricbill.subsidy }}</span>
              </li>
              <li class="mui-table-view-cell">
                <span>电费余额:</span>
                <span>{{ electricbill.total }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </mt-popup>

    <div class="mui-card-content">
      <div class="amap-page-container">
        <el-amap
          vid="amapDemo"
          :center="center"
          :zoom="zoom"
          :style="{'height': screenHeight}"
          class="amap-demo"
        >
          <el-amap-info-window :position="window.position" :content="window.content"></el-amap-info-window>
        </el-amap>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Popup } from "mint-ui";

export default {
  data() {
    let center = [112.04523397480101, 31.997415701146636];
    return {
      flag: false,
      electricbill: {},
      zoom: 12,
      center,
      name: "",
      screenHeight: document.documentElement.clientHeight + "px", //此处也可能是其他获取方法
      popupVisible: true,
      popHeight: "20%",
      window: {
        position: center,
        content: "看,这就是你的寝室!"
      }
    };
  },
  created() {
    const rome = this.$store.state.userInfo.rome;
    if (rome != undefined) {
      this.name = rome;
      this.getElectricbill();
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getElectricbill() {
      this.$http
        .get("api/electricbill/" + this.name)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            const data = this.$aes.decrypt(res.body.message, key);
            this.electricbill = JSON.parse(data);
            this.flag = true; // 显示数据
            this.popHeight = "50%"; // 设置模态框高度
            this.popupVisible = true; // 显示模态框
            // this.$store.commit("addUserRome", this.name); // 存储用户房间
          } else {
            Toast("电费获取失败");
            this.name = "";
          }
        })
        .catch(err => {
          Toast("电费获取失败");
          this.name = "";
        });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>