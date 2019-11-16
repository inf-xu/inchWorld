<template>
  <div class="about-container">
    <aboutBack></aboutBack>
    <img class="logo-img"
      src="../../assets/logo.png"
    />
    <div class="display-info">
        <p>若有疑问，联系QQ:2891649549</p>
        <span>我的<a href="http://daisylike.top">博客</a></span>
        <small>V-1.1.0</small>
    </div>
  </div>
</template>

<script>
import aboutBack from "../subcomponents/Back.vue";

export default {
  data() {
    return {};
  },
  created() {},
  components: {
    aboutBack
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