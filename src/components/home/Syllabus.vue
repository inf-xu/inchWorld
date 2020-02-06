<template>
  <div class="syllabus-container">
    <!-- head -->
    <div class="header">
      <title>课程表</title>
      <div class="top-header">
        <div class="cal">
          <div v-for="(item, index) in calanderList" :key="item.cal" class="cal-item">
            <span :class="{'cal-active': item.active === item.cal ? true : false}">{{ item.cal }}</span>
            <div
              class="weekly-item"
              @click.prevent="changeDaySyll(index)"
              :class="{'week-active': item.active === item.cal ? true : false}"
            >{{ item.week }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- content -->
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
              :style="{'background-color': RandomColor(i_index + index)}"
            >
              <div class="info">{{i.info}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataArea, currentDate, JsonSort } from "../../common/utils.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      syllsbusList: [],
      touchSyllList: [],
      calanderList: []
    };
  },
  created() {
    this.getSyllabusList();
    this.handleCal(currentDate());
  },
  methods: {
    changeDaySyll(index) {
      let week = ["1", "2", "3", "4", "5", "6", "7"]
      this.getCurrentWeek(this.syllsbusList, week[index])

      // update active
      this.handleCal(getDataArea()[index])
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
        id: "2017117108",
        zc: this.weekly
      };
      this.$http
        .post("api/syllabusinfo", formData)
        .then(res => {
          if (res.body.status === 0) {
            this.syllsbusList = JSON.parse(res.body.message);
            const w = ['7', '0', '1', '2', '3', '4', '5', '6']
            const index = new Date().getDay()
            this.getCurrentWeek(this.syllsbusList, w[index]);
          } else {
            Toast("课程表获取失败,请稍后再试");
          }
        })
        .catch(err => {
          Toast("课程表获取失败,请稍后再试");
        });
    },
    RandomColor() {
      const colorList = [
        "#ff8080",
        "#FF80AC",
        "#71B8FF",
        "#80D8FF",
        "#85B8CF",
        "#90C652",
        "#D8AA5A",
        "#FC9F9D",
        "#0A9A84",
        "#61BC69",
        "#12AEF3",
        "#E29AAD"
      ];
      let num = Math.floor(Math.random() * 10);
      return colorList[num];
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
.syllabus-container {
  background-color: #f0f0f0;
  width: 100%;

  .testClass {
    background-color: #ff8080;
  }

  .cal-active {
    color: #ff8080;
  }

  .week-active {
    background-color: #ff8080;
  }

  .header {
    width: 100%;
    height: 30%;
    background-color: #fff;
    box-shadow: 0 3px 10px #888888;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    title {
      font-size: 24px;
      font-weight: bold;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .cal {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;

      .cal-item {
        width: 14%;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .weekly-item {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        margin-top: 20px;
        border: 1px solid #ff8080;
      }
    }
  }

  .syllabus-content {
    margin: 20px 15px 0 15px;
    height: 70%;
    .syll-item {
      .title {
        font-size: 18px;
        color: #b4b4b4;
        font-weight: bold;
      }

      .title:after {
        content: "";
        width: 80%;
        border-top: 3px #dedede solid;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
      }

      .syll-content {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        .l-left-syll-item {
          margin: 0 0 0 40px;
          .link-right {
            width: 50px;
            height: 30px;
            font-size: 16px;
            border-right: solid white 2px;
          }
        }

        .r-right-syll-item {
          .info-syll {
            width: 250px;
            height: 80px;
            margin-bottom: 10px;
            // border: 1px solid #FF8080;
            border-radius: 7px;

            .info {
              color: white;
              font-size: 16px;
              display: flex;
              text-align: center;
              justify-content: space-around;
              font-weight: bold;
              align-items: center;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>