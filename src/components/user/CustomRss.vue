<template>
  <div class="custom-container">
    <!-- 导航栏 -->
    <header class="absolute-nav" style="background-color: #607D8B">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback()"></span>
          <span style="color: white; margin-left:25px;">自定义</span>
        </div>
        <div class="nav-right">
          <router-link to="/rss">
            <span class="mui-icon iconfont icon-dongtai01"></span>
          </router-link>
        </div>
      </div>
    </header>


    <!-- Rss 列表 -->
    <ul class="mui-table-view nav-translate">
      <li class="mui-table-view-cell mui-media rss-flex" v-for="item in rssList" :key="item.id">
        <div class="rss-left">
          <img :src="item.image" />
          <div class="rss-info">
            <span>{{ item.name }}</span>
            <p>{{ item.title }}</p>
          </div>
        </div>
        <div class="rss-right" @click.prevent="handleRss(item)">
          <p class="rss-sub" v-if="item.subscribe">退订</p>
          <p class="rss-unsub" v-if="!item.subscribe">订阅</p>
        </div>
      </li>
    </ul>

    <div style="height: 40px; margin-top: 90px;"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      rssList: this.$store.getters.getTotalRssList
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    handleRss(item) {
      item.subscribe = !item.subscribe;
      this.$store.commit("handleRssList", item.id);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>