<template>
  <div class="electron-container">
    <electronSearch @getText="getTextFromSearch" :info="'15-203'" :type="'text'"></electronSearch>

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

    <electronInfo :info="'输入你的房间号,例如<strong>15-203</strong>'" v-show="!flag"></electronInfo>


    <div class="mui-card">
      <div class="mui-card-content">
        <div class="amap-page-container">
          <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo">
            <el-amap-info-window :position="window.position" :content="window.content"></el-amap-info-window>
          </el-amap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import electronSearch from "../subcomponents/HandleSearch.vue";
import electronInfo from "../subcomponents/Info.vue";
import { Toast } from "mint-ui"

export default {
  data() {
    let center = [112.04523397480101, 31.997415701146636];
    return {
      flag: false,
      electricbill: {},
      zoom: 12,
      center,
      name: '',
      window: {
        position: center,
        content: "这里距离的你的家乡有多远呢?"
      }
    };
  },
  created() {
    const rome = this.$store.state.userInfo.rome
    if(rome != undefined) {
      this.name = rome
      this.getElectricbill()
      this.flag = true
    }
  },
  methods: {
    getTextFromSearch(materoom) {
      this.name = materoom;
      this.getElectricbill()
    },
    getElectricbill() {
      this.$http
        .get("api/electricbill/" + this.name)
        .then(res => {
          if (res.body.status === 0) {
            this.electricbill = res.body.message;
            this.flag = true;
            this.$store.commit("addUserRome", this.name);
          } else {
            Toast("电费获取失败");
          }
        })
        .catch(err => {
          Toast("服务器炸了");
        });
    }
  },
  components: {
    electronSearch,
    electronInfo
  }
};
</script>

<style lang="scss" scoped>
.electron-container {
  .mui-card {
    border-radius: 10px;
    .mui-card-header {
      background-color: #ccc;
      color: white;
    }
  }
  .amap-demo {
    height: 400px;
  }
  .mui-card-content-inner {
    .mui-table-view-cell {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>