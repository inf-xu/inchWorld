<template>
  <div class="user-container">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner head-img">
          <img src="../../assets/about-daisy.jpg" @click="yh_info" />
          <div class="mui-media-body">
            {{ user.xm }}
            <p>{{ user.zymc }}</p>
          </div>
          <span class="mui-icon mui-icon-compose" @click="editUser"></span>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/user/score">
                <span class="mui-icon mui-icon-extra mui-icon-extra-university"></span>
                <div class="mui-media-body">查成绩</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/user/physical">
                <span class="mui-icon mui-icon-extra mui-icon-extra-rank"></span>
                <div class="mui-media-body">查体测</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/user/book">
                <span class="mui-icon mui-icon-extra mui-icon-extra-xiaoshuo"></span>
                <div class="mui-media-body">查图书</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="mui-card-footer">白马清欢无别事,我在等风也等你。</div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">设置</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <router-link class="mui-navigate-right" to="/privary">隐私</router-link>
            </li>
            <li class="mui-table-view-cell">
              <a
                href="https://github.com/KDaisyers/inchWorld"
                target="_block"
                class="mui-navigate-right"
              >帮助</a>
            </li>
          </ul>
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <router-link class="mui-navigate-right" to="/about">
                关于方寸
                <a class="mui-pull-right update">V1.1.0</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" style="text-align: center;">
            <a href="#" @click.prevent="loginout">退出登录</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.user = {
        xm: this.$store.state.userInfo.name,
        zymc: this.$store.state.userInfo.zy
      };
    },
    yh_info() {
      Toast("头像你是不可能换的啦");
    },
    editUser() {
      this.$router.push("/user/edit");
    },
    loginout() {
      this.$http.get('api/loginout').then( res => {
        if (res.body.status === 0) {
          Toast("退出成功");
          this.$store.commit("loginOut");
          this.$router.push("/login");
        }
      }).catch(err => {
        Toast("退出失败");
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  .mui-card {
    a {
      text-decoration: none;
    }
    .head-img {
      margin-left: -30px;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      height: 80px;
      img {
        width: 50px;
      }
      .mui-media-body {
        margin-left: -60px;
      }
    }
    .mui-card-footer {
      display: flex;
      justify-content: center;
      font-style: italic;
      font-weight: bold;
    }
  }
}
</style>