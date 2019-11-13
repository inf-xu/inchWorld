<template>
  <div class="about-container">
    <mt-header fixed title="方寸" style="background-color: #CDCDCD;">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <img class="logo-img"
      src="https://tse1-mm.cn.bing.net/th?id=OIP.Y8i8YSO13-l6bfdCYcoS3gHaEK&w=300&h=168&c=7&o=5&dpr=1.25&pid=1.7"
    />
    <div class="display-info">
        <p>若有疑问，联系QQ:2891649549</p>
        <span>我的<a href="http://daisylike.top">博客</a></span>
        <small>V-1.1.0</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.about-container {
    .logo-img {
        margin-top: 100px; 
        width:100%
    }
    .display-info {
        text-align: center;
    }
}
</style>