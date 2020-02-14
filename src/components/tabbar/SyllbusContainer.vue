<template>
  <div class="syllabus-container">
    <div style="height: 50px;"></div>
    <!-- head -->
    <div class="header">
      <div class="top-header">
        <div class="cal">
          <div v-for="(item, index) in calanderList" :key="item.cal" class="cal-item">
            <span :class="{'cal-active': item.active === item.cal ? true : false}">{{ item.cal }}</span>
            <div
              class="mui-badge"
              @click.prevent="changeDaySyll(index)"
              :class="{'week-active': item.active === item.cal ? true : false}"
            >{{ item.week }}</div>
          </div>
        </div>
      </div>
    </div>

    <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
      <div class="syllabus-content">
        <div class="syll-item" v-for="(item, index) in touchSyllList" :key="index">
          <div class="title">{{handleTime(index)}}</div>
          <div class="syll-content">
            <div class="l-left-syll-item">
              <p class="link-right">第1节</p>
              <p class="link-right">第2节</p>
              <p class="link-right">第3节</p>
              <p class="link-right">第4节</p>
            </div>
            <div class="r-right-syll-item">
              <div
                v-for="(i, i_index) in item"
                :key="i_index"
                class="info-syll"
                :style="{'background-color': getColor(i_index)}"
              >
                <div class="info">{{i.info}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-touch>

    <!-- content -->
  </div>
</template>

<script>
import {
  getDataArea,
  currentDate,
  JsonSort,
  RandomColor
} from "../../common/utils.js";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      syllsbusList: [],
      touchSyllList: [],
      calanderList: [],
      index: 0
    };
  },
  created() {
    this.getSyllabusList();
    this.handleCal(currentDate());
  },
  methods: {
    onSwipeLeft: function() {
      if (this.index > 5) {
        return;
      }
      this.changeDaySyll(this.index + 1);
    },
    onSwipeRight: function() {
      if (this.index < 1) {
        return;
      }
      this.changeDaySyll(this.index - 1);
    },
    changeDaySyll(index) {
      let week = ["1", "2", "3", "4", "5", "6", "7"];
      this.getCurrentWeek(this.syllsbusList, week[index]);
      // update active
      this.handleCal(getDataArea()[index]);
      this.index = index;
    },
    getCurrentWeek(message, currentWeekly) {
      let disorderList = [];
      let kcsjList = [];
      message.forEach(item => {
        const xqj = item.kcsj.substring(0, 1);
        if (xqj === currentWeekly) {
          let kcsj = (parseInt(item.kcsj.substring(2, 3)) - 1) / 2;
          const o = {
            kcsj: kcsj,
            info: item.kcmc + "@" + item.jsxm + item.jsmc
          };
          kcsjList.push(kcsj);
          disorderList.push(o);
        }
      });
      // console.log(disorderList);
      // 分层
      [0, 1, 2, 3, 4, 5].filter(function(v) {
        if (kcsjList.indexOf(v) == -1) {
          const o = {
            kcsj: v,
            info: "此节无课，放松一下吧!"
          };
          disorderList.push(o);
        }
      });
      disorderList = JsonSort(disorderList, "kcsj");
      this.handleWeekSysll(disorderList);
    },
    handleWeekSysll(disorderList) {
      // 组合
      const endList = [[], [], []];
      disorderList.forEach(item => {
        switch (item.kcsj) {
          case 0:
          case 1:
            endList[0].push(item);
            break;
          case 2:
          case 3:
            endList[1].push(item);
            break;
          case 4:
          case 5:
            endList[2].push(item);
            break;
          default:
            break;
        }
      });
      Indicator.close();
      // console.log(endList);
      this.touchSyllList = endList;
    },
    getClassNum() {
      const now = new Date();
      let nowYear = now.getFullYear();
      let startData = nowYear + "-09-01";
      if (
        now.getMonth() + 1 < 2 ||
        (now.getMonth() + 1 == 2 && now.getDate() < 17)
      ) {
        startData = nowYear - 1 + "-09-01";
      } else if (now.getMonth() + 1 < 8) {
        startData = nowYear + "-02-17";
      }
      const num = new Date(startData);
      let offset = 0;
      if (num == 0) {
        offset = 1;
      } else if (num == 6) {
        offset = 2;
      }
      const day =
        Math.floor(
          (Date.parse(now) - Date.parse(startData)) / (1000 * 60 * 60 * 24)
        ) + offset;
      const m = day % 7;
      if (m == 0) {
        return parseInt(day / 7);
      } else {
        return parseInt(day / 7) + 1;
      }
    },
    getSyllabusList() {
      this.weekly = this.getClassNum();
      if (this.weekly > 18) {
        this.weekly = 18;
      }
      const formData = {
        id: this.$store.state.userInfo.id,
        zc: this.weekly
      };
      Indicator.open();
      this.$http
        .post("api/syllabusinfo", formData)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            const syllsbusList = JSON.parse(this.$aes.decrypt(res.body.message, key));
            const w = ["7", "0", "1", "2", "3", "4", "5", "6"];
            this.index = new Date().getDay() - 1;
            this.getCurrentWeek(this.syllsbusList, w[this.index + 1]);
          } else {
            Indicator.close();
            Toast("课程表获取失败,请稍后再试");
          }
        })
        .catch(err => {
          Indicator.close();
          Toast("课程表获取失败,请稍后再试");
        });
    },
    getColor(index) {
      // return getColor(index);
      return RandomColor();
    },
    handleTime(index) {
      const list = ["上午", "上午", "下午", "下午", "晚上", "晚上"];
      return list[index];
    },
    handleCal(day) {
      let calList = getDataArea();
      let weeklyList = ["一", "二", "三", "四", "五", "六", "日"];
      let list = [];
      for (let index = 0; index < 7; index++) {
        const o = {
          cal: calList[index],
          week: weeklyList[index],
          active: day
        };
        list.push(o);
      }
      this.calanderList = list;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>