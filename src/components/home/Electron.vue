<template>
  <div class="electron-container">
    <todoSearch @getText="getElectricbill" :info="'15-203'"></todoSearch>

    <div class="mui-card" v-show="flag">
      <div class="mui-card-header">电费情况</div>
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

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner inner-info">
          输入你的房间号,例如<strong>"15-203"</strong>
        </div>
      </div>
    </div>

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
import todoSearch from "../subcomponents/HandleSearch.vue";

export default {
  data() {
    let center = [112.04523397480101, 31.997415701146636];
    return {
      flag: false,
      electricbill: {},
      zoom: 12,
      center,
      window: {
        position: center,
        content: "这里距离的你的家乡有多远呢?"
      }
    };
  },
  methods: {
    getElectricbill(materoom) {
      const name = materoom;

      this.$http
        .get("api/electricbill/" + name)
        .then(res => {
          if (res.body.status === 0) {
            this.electricbill = res.body.message;
            this.flag = true;
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
    todoSearch
  }
};
</script>

<style lang="scss" scoped>
.electron-container {
  .amap-demo {
    height: 400px;
  }
  .mui-card-content-inner {
    .mui-table-view-cell {
      display: flex;
      justify-content: space-between;
    }
  }
  .inner-info {
    text-align: center;
    font-size: 16px;
  }
}
</style>