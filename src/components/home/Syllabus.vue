<template>
  <div class="syllabus-caontainer">
      <div class="mui-card" v-for="i in 7" :key="i">
        <div class="mui-card-header"><span>周{{i}}</span>第{{weekly}}周</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="(item, j) in filterArr[i]" :key="j">
            <span>{{ item.index }} &nbsp;&nbsp; {{item.address}} &nbsp;&nbsp; {{item.teacher}} &nbsp;&nbsp; {{item.course}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      syllsbusList: [],
      weekly: 0,
      filterArr: []
    };
  },
  created() {
    this.getSyllabusList();
  },
  computed: {
    filterRealArr() {
      return filterArr.filter(function(item) {
        console.log(item);
      });
    }
  },
  methods: {
    getClassNum() {
      const now = new Date();
      let startData = now.getFullYear() + "-09-01";
      if ((now.getMonth + 1) < 8) {
        startData = now.getFullYear() + "-02-17"
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
        this.weekly = 18
      }
      const formData = {
        id: this.$store.state.userInfo.id,
        zc: this.weekly
      };
      this.$http
        .post("api/syllabusinfo", formData)
        .then(res => {
          if (res.body.status === 0) {
            this.syllsbusList = JSON.parse(res.body.message);
            let arr = [[], [], [], [], [], [], [], []];
            this.syllsbusList.forEach(item => {
              const week = item.kcsj.substring(0, 1);
              const info = {
                index: item.kcsj.substring(1),
                address: item.jsmc,
                teacher: item.jsxm,
                course: item.kcmc
              };
              arr[week].push(info);
            });
            this.filterArr = arr;
          } else {
            Toast("课程表获取失败,请稍后再试");
          }
        })
        .catch(err => {
          Toast("课程表获取失败,请稍后再试");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.syllabus-caontainer {
  .mui-card {
    .mui-card-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>