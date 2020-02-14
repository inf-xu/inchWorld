<template>
  <header class="absolute-nav">
    <div class="home-nav">
      <div class="nav-left">
        <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
        <span style="margin-left:25px;">{{name}}</span>
      </div>
      <div class="nav-right">
        <span class="icon iconfont icon-bangzhu" @click.prevent="tip(info)" v-if="info !== undefined ? true: false"></span>
      </div>
    </div>
  </header>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
    };
  },
  methods: {
    tip(info) {
      Toast({
        message: "方寸:" + info,
        position: "center",
        duration: 5000
      });
    },
    goback() {
      this.$router.go(-1);
    }
  },

  props: ["info", "name"]
};
</script>

<style lang="scss" scoped>
</style>