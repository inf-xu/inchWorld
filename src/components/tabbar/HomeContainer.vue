<template>
  <div class="home-container">
    <!-- 卡片: 提示学生重要考试 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner strong-info">
            距离考研还有
            <strong>{{ day }}</strong>天
        </div>
      </div>
    </div>

    <!-- 卡片: 教务系统 -->
    <div class="mui-card">
      <div class="mui-card-header">教务系统</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/home/syllabus">
                <span class="mui-icon mui-icon-extra mui-icon-extra-regist"></span>
                <div class="mui-media-body">课&nbsp;表</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/home/voluntary">
                <span class="mui-icon mui-icon-checkmarkempty"></span>
                <div class="mui-media-body">义工时</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/home/electron">
                <span class="mui-icon mui-icon-extra mui-icon-extra-classroom"></span>
                <div class="mui-media-body">电&nbsp;费</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 卡片: 提示 -->
    <div class="mui-card">
      <div class="mui-card-header">很高兴见到你!</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;感谢你下载使用《方寸》</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;这是一个聚合我们学校各个信息查询为一体的工具APP，也许你和我有一样的困扰，
            就是一旦要查看自己课表、义工时和成绩时，就要在各个公众号找链接查询，一套功夫下来，甚至自己都忘了要干什么。
          </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;为了方便查询，我在业余开发了这一款工具，初衷就为了解放自己的双手，同时也是为了简化教务系统繁琐的操作。</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;可能是个人能力的原因，你使用时可能感到并不流畅，偶尔还会蹦出几个bug，界面也许不能让你满意，在这里我替UI设计师和开发者向你道歉，
            个人开发者实在是没钱换服务器，但是我会尽最大的努力。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;由于不同系统之间密码可能不同，因此当你在查询体测成绩的时候，需输入体育系统的密码；当你查询自己寝室电费的时候，第一次需要手动输入密码；
            当然如果你觉得每次查询都要输入较麻烦，你可以进入
            <strong>我的</strong> 界面，填写寝室信息和体育系统密码。
          </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;你不用担心信息泄露问题，目前软件开源在github上，如果你在使用过程中出现了一些问题，可以向我提issue，感激不尽。</p>
        </div>
      </div>
      <div class="mui-card-footer right-info">——《方寸》</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      flag: false,
      day: "",
    };
  },
  created() {
    this.getUserInfo()
    this.awayLast()
  },
  methods: {
    getUserInfo() {
      const id = this.$store.state.userInfo.id;
      this.$http
        .get("api/userinfo/" + id)
        .then(res => {
          if (res.body.status === 0) {
            const user = JSON.parse(res.body.message);
            this.$store.commit("addUserInfo", user);
          } else {
            Toast("前方通道拥挤");
          }
        })
        .catch(err => {
          Toast("前方通道拥挤");
        });
    },
    awayLast() {
      const now = new Date()
      const dayYear = now.getFullYear()
      let ky = new Date(dayYear+'-12-21')
      if (ky < now) {
        ky = new Date((dayYear + 1)+'-12-21')
      }
      this.day = Math.floor((ky - Date.parse(now)) / (1000 * 60 * 60 * 24)) + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-enter {
  opacity: 0;
  transform: translateY(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.home-container {
  .input-con {
    background-color: gray;
  }
  .mui-icon {
    font-size: 10px;
  }
  a {
    text-decoration: none;
  }
  .strong-info {
    background-color: rgba(83, 82, 81, 0.29);
    color: white;
    font-size: 17px;
    text-align: center;
    strong {
      font-size: 25px;
      margin: 10px 5px;
    }
  }
  .right-info {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>