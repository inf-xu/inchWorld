<template>
  <header class="absolute-nav">
    <div class="home-nav">
      <div class="nav-left">
        <span>{{name}}</span>
        <router-link to="/collection">
          <span class="mui-icon iconfont icon-daohang" style="font-size: 24px;"></span>
        </router-link>
      </div>
      <div class="nav-right">
        <router-link to="/set">
          <span class="mui-icon iconfont icon-xinbaniconshangchuan-" style="font-size: 26px;"></span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  props: ["name"]
};
</script>

<style lang="scss" scoped>
</style>
