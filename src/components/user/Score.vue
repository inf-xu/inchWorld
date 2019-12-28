<template>
  <div class="score-class">
    <scoreSearch @getText="searchItem" :info="'search'" :type="'text'"></scoreSearch>

    <div class="mui-card" v-if="flag">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <table class="table table-striped">
            <tr>
              <th>类别</th>
              <th>课程</th>
              <th>学分</th>
              <th>成绩</th>
            </tr>
            <tr v-for="(it, j) in searchArr" :key="j">
              <td>{{it.kclbmc}}</td>
              <td>{{it.kcmc}}</td>
              <td>{{it.xf}}</td>
              <td>{{it.zcj}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="mui-card" v-for="(item, i) in scoreList" :key="i">
      <div class="mui-card-header">
        开课时间&nbsp;
        <span>{{ scoreList[i][0].xqmc }}</span>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <table class="table table-striped">
            <tr>
              <th>类别</th>
              <th>课程</th>
              <th>学分</th>
              <th>成绩</th>
            </tr>
            <tr v-for="(it, j) in scoreList[i]" :key="j">
              <td>{{it.kclbmc}}</td>
              <td>{{it.kcmc}}</td>
              <td>{{it.xf}}</td>
              <td>{{it.zcj}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scoreSearch from "../subcomponents/HandleSearch.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      scoreList: [],
      searchArr: [],
      flag: false
    };
  },
  created() {
    this.getScoreList();
  },
  methods: {
    getScoreList() {
      const id = this.$store.state.userInfo.id;
      const data = {
        id: id,
        updateFlag: this.isUpdate()
      }
      this.$http
        .post("api/system", data)
        .then(res => {
          if (res.body.status === 0) {
            this.scoreList = JSON.parse(res.body.message)
          }
        })
        .catch(err => {
          Toast("等等，我去服务商交钱去")
        });
    },
    searchItem(text) {
      this.scoreList.forEach(item => {
        item.forEach(jtem => {
          if (jtem.kcmc.indexOf(text) != -1) {
            this.flag = true;
            this.searchArr.push(jtem);
          }
        });
      });
    },
    isUpdate() {
      const today = new Date()
      const year = today.getFullYear()
      const lowTime1 = new Date(year+"-12-10")
      const highTime1 = new Date(year+"-12-29")
      const lowTime2 = new Date(year+"-8-10")
      const highTime2 = new Date(year+"-8-20")

      if (today > lowTime1 && today < highTime1) {
        return true
      } else if (today > lowTime2 && today < highTime2) {
        return true
      }
      return false
    }
  },
  components: {
    scoreSearch
  }
};
</script>

<style lang="scss" scoped>
.score-class {
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
      font-size: 14px;
    }
  }
}
</style>