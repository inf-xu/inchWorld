<template>
  <div class="physical-container img-preview-vue">
    <!-- nav -->
    <header class="absolute-nav">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
        </div>
        <div class="nav-right">
          <div class="search bar8">
            <form>
              <input
                type="password"
                v-model="ipassword"
                @keyup.enter="getPhysicalList()"
                placeholder="体测密码"
              />
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

    <div class="sport-content nav-translate">
      <div class="sport-li" v-for="(item, index) in physicalList" :key="index">
        <div class="sport-user">
          <img src="../../assets/logo03_i.png" @click.prevent="clickTerm(item.year, item.term)" />
          <div class="right-user">
            <span>襄大体育平台</span>
            <p>{{calculateDate()}}</p>
          </div>
        </div>
        <!-- <hr> -->
        <div class="sport-info">
          <span>在{{ item.year }}-{{ item.term }}学期中,你的体测成绩{{ item.grade }},得分{{ item.score }}.</span>
          <span>点击头像或者图片显示对应学年度的体测详情。</span>
          <img
            src="https://s2.ax1x.com/2020/01/08/lgLUBD.jpg"
            @click.prevent="clickTerm(item.year, item.term)"
          />
        </div>
        <hr />
      </div>
    </div>

    <mt-popup class="popup" v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <h4>提示</h4>
      <p>由于教务系统和体育系统密码不同,另需输入体育系统的密码.</p>
    </mt-popup>

    <mt-popup
      v-model="popupDetail"
      class="popup-detail"
      position="center"
      popup-transition="popup-fade"
    >
      <div class="voluntary-content">
        <div>{{yearTerm}}</div>
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
    </mt-popup>

    <div style="margin-top: 40px;height: 80px;"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import moment from "moment";

export default {
  data() {
    return {
      physicalList: [],
      ipassword: "",
      yearTerm: "",
      popupVisible: true,
      popupDetail: false,
      physicalDetail: []
    };
  },
  created() {
    const phyPwd = this.$store.state.userInfo.phyPwd;
    if (phyPwd != undefined) {
      this.ipassword = phyPwd;
      this.getPhysicalList();
      this.popupVisible = false;
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    tip() {
      Toast({
        message: "方寸:输入体育系统密码获得体测信息",
        position: "center",
        duration: 5000
      });
    },
    calculateDate() {
      return moment()
        .format()
        .substring(0, 10);
    },
    getPhysicalList() {
      const user = {
        name: this.$store.state.userInfo.id,
        password: pwd
      };

      this.$http
        .post("api/physical", user)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            this.physicalList = JSON.parse(this.$aes.decrypt(res.body.message, key));
            physicalList = res.body.message;
            this.$store.commit("addUserPhysicall", this.ipassword);
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
        name: this.$store.state.userInfo.id,
        year: year,
        term: term
      };
      this.$http
        .post("api/physicaldetail", user)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            this.physicalDetail = JSON.parse(this.$aes.decrypt(res.body.message, key));
            this.yearTerm = year + "-" + term;
            this.popupDetail = true;
          } else {
            Toast(res.body.message);
          }
        })
        .catch(err => {
          Toast(res.body.message);
        });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>

</style>