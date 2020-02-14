<template>
  <div class="rss-container">
    <rssNav :name="'订阅'"></rssNav>
    <div class="rss-content nav-translate">
      <router-link
        class="rss-li"
        v-for="item in rssList"
        :key="item.image"
        :to="'/rsslist/' + item.id"
      >
        <img class="middle-v" :src="item.image" :alt="item.name" />
        <span class="middle-v">{{ item.name }}</span>
      </router-link>
    </div>
    <div style="height: 30px; margin-top: 90px"></div>
  </div>
</template>

<script>
import rssNav from "../subcomponents/NavTabar.vue";

export default {
  data() {
    return {
      rssList: []
    }
  },
  /** 由于css学的太差了，这里只能这样了，等以后再来改 */
  created() {
    let array = this.$store.getters.getTotalRssList
    array.forEach(item => {
      if (item.subscribe) {
        this.rssList.push(item)
      }
    })
  },
  components: {
    rssNav
  }
};
</script>

<style lang="scss" scoped>

</style>