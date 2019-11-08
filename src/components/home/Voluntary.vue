<template>
  <div class="vol-container">
    <todoSearch @getText="searchItem" :info="'search'"></todoSearch>

    <div class="mui-card" v-if="flag">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <table class="table table-striped">
            <tr>
              <th>义工项目</th>
              <th>时间</th>
              <th>义工时</th>
            </tr>
            <tr v-for="item in searchArr" :key="item.id">
              <td>{{item.name}}</td>
              <td>{{item.time}}</td>
              <td>{{item.score}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div>
      <div class="mui-card" v-for="(i, index) in arr" :key="index">
        <div class="mui-card-header">
          {{arr[index]}}
          <mt-spinner type="fading-circle"></mt-spinner>
        </div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <table class="table table-striped">
              <tr>
                <th>义工项目</th>
                <th>时间</th>
                <th>义工时</th>
              </tr>
              <tr v-for="(item, j) in (voluntaryList[arr[index]])" :key="j">
                <td>{{item.name}}</td>
                <td>{{item.time}}</td>
                <td>{{item.score}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import todoSearch from "../subcomponents/HandleSearch.vue";

export default {
  data() {
    return {
      voluntaryList: {},
      arr: [],
      message: [],
      searchArr: [],
      flag: false
    };
  },
  created() {
    this.getVoluntaryList(), this.getLocalVoluntary();
  },
  methods: {
    getVoluntaryList() {
      const user = {
        id: "2017117203",
        name: "胡毅"
      };
      this.$http
        .post("api/voluntary", user)
        .then(res => {
          if (res.body.status === 0) {
            if (res.body.message == null) {
              return Toast("你还没有做过义工哦");
            }
            const msg = res.body.message;
            this.message = msg;

            localStorage.setItem("localVoluntary", JSON.stringify(msg));
          } else {
            Toast("义工时列表获取失败");
          }
        })
        .catch(err => {
          Toast("服务器炸了");
        });
    },
    handleMsg(msg) {
      let i = 0;
      const o = {};
      JSON.parse(msg).forEach(item => {
        if (o[item.time.substring(0, 4)] != null) {
          o[item.time.substring(0, 4)].push(item);
        } else {
          o[item.time.substring(0, 4)] = [];
          this.arr[i] = item.time.substring(0, 4);
          i++;
        }
      });
      this.voluntaryList = o;
    },
    getLocalVoluntary() {
      this.handleMsg(localStorage.getItem("localVoluntary"));
    },
    searchItem(str) {
      this.message.forEach(item => {
        if (item.name.indexOf(str) != -1) {
          this.flag = true;
          this.searchArr.push(item);
        }
      });

      if (!this.flag) {
        Toast("未搜索到指定义工项目");
      }
    }
  },
  components: {
    todoSearch
  }
};
</script>

<style lang="scss" scoped>
.vol-container {
  .mui-card {
    .mui-card-header {
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    th {
      word-break: keep-all;
      white-space: nowrap;
    }
    td {
      font-size: 15px;
    }
  }
}
</style>