<template>
  <div class="physical-container">
    <todoSearch @getText="getPhysicalList" :info="'password'" :type="'password'"></todoSearch>

    <div class="mui-card" v-show="!flag">
      <div class="mui-card-content">
        <div class="mui-card-content-inner inner-info">
          <p>
            请输入你&nbsp;
            <strong>体育系统</strong>&nbsp;&nbsp;&nbsp;的密码
          </p>
          <small>
            如有疑问,请查看
            <a href="#">隐私</a>
          </small>
        </div>
      </div>
    </div>

    <div class="mui-card" v-show="flag">
      <div class="mui-card-header">体测成绩</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <table class="table table-striped">
            <tr>
              <th>学期</th>
              <th>得分</th>
              <th>等级</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, j) in physicalList" :key="j">
              <td>{{ item.year }}-{{ item.term }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.grade }}</td>
              <td><a href="#" @click.prevent="clickTerm(item.year, item.term)">查看</a></td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="mui-card" v-show="detailFlag">
      <div class="mui-card-header">{{ yearTerm }}&nbsp;学年度</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <table class="table table-striped">
            <tr>
              <th>项目</th>
              <th>测试成绩</th>
              <th>得分</th>
              <th>等级</th>
            </tr>
            <tr v-for="(item, j) in physicalDetail" :key="j">
              <td>{{ item.name }}</td>
              <td>{{ item.testScore }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.grade }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import todoSearch from "../subcomponents/HandleSearch.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      physicalList: [],
      flag: false,
      ipassword: '',
      yearTerm: '',
      physicalDetail: [],
      detailFlag: false
    };
  },
  methods: {
    getPhysicalList(pwd) {
      this.ipassword = pwd
      const user = {
        name: "2017117108",
        password: pwd
      };

      this.$http
        .post('api/physical', user)
        .then(res => {
          if (res.body.status === 0) {
            this.physicalList = res.body.message
            this.flag = true
          } else {
            Toast(res.body.message);
          }
        })
        .catch(err => {
          Toast(res.body.message);
        });
    },
    clickTerm(year, term) {
      const user = {
        name: "2017117108",
        year: year,
        term: term
      }
      this.$http.post('api/physicaldetail', user).then(res => {
          if (res.body.status === 0) {
            this.physicalDetail = res.body.message
            this.yearTerm = year + '-' + term
            this.detailFlag = true
          } else {
            Toast(res.body.message);
          }
        })
        .catch(err => {
          Toast(res.body.message);
        });
    }
  },
  components: {
    todoSearch
  }
};
</script>

<style lang="scss" scoped>
.physical-container {
  .mui-card {
    .inner-info {
      text-align: center;
      strong {
        font-style: italic;
      }
    }
  }
}
</style>