<template>
  <div class="edit-container">
    <!-- <userBack></userBack> -->

    <div class="mui-card">
      <div class="mui-card-header">基本账户</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell">
              <a>
                姓名
                <span class="mui-pull-right">{{ user.name }}</span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a>
                学号
                <span class="mui-pull-right">{{ user.id }}</span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a id="head" class="mui-navigate-right">
                班级
                <span class="mui-pull-right head">{{ user.class }}</span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a id="head" class="mui-navigate-right">
                专业
                <span class="mui-pull-right head">{{ user.majorCl }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">个人账户</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell" @click="flag1=true">
              <input v-if="flag1" type="text" v-model="romeText" @keyup.enter="saveRomeInfo" />
              <a>
                寝室
                <span class="mui-pull-right">{{ romeText == '' ? "点击输入寝室号'15-203'" : romeText }}</span>
              </a>
            </li>
            <li class="mui-table-view-cell" @click="flag2=true">
              <input v-if="flag2" type="password" v-model="physicalText" @keyup.enter="savePhysicalInfo" />
              <a>
                体育系统
                <span class="mui-pull-right">{{ physicalText == '' ? '点击输入密码' : '******' }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      romeText: "",
      physicalText: "",
      flag1: false,
      flag2: false
    };
  },
  created() {
    const rome = this.$store.state.userInfo.rome
    const phyPwd = this.$store.state.userInfo.phyPwd
    if (rome != undefined) {
      this.romeText = rome
    }if (phyPwd != undefined) {
      this.physicalText = phyPwd
    }
    this.user = {
      id: this.$store.state.userInfo.id,
      name: this.$store.state.userInfo.name,
      class: this.$store.state.userInfo.bj,
      majorCl: this.$store.state.userInfo.zy
    };
  },
  methods: {
    saveRomeInfo() {
      this.$store.commit("addUserRome", this.romeText);
      this.flag1 = false
    },
    savePhysicalInfo() {
      this.$store.commit("addUserPhysicall", this.physicalText);
      this.flag2 = false
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-container {
  .mui-card {
    margin-top: 30px;
  }
}
</style>>