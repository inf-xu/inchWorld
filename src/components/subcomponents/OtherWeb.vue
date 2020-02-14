<template>
  <div class="otherweb-container">
    <otherNav :name="'详情'" :info="'此处显示外部链接'"></otherNav>
    <iframe :src="url" width="100%" :height="height" frameborder="0" class="nav-translate"></iframe>
  </div>
</template>

<script>
import otherNav from "../subcomponents/NavOther.vue";

export default {
  data() {
    return {
      height: document.documentElement.clientHeight,
      url: this.$route.params.id
    };
  },
  components: {
    otherNav
  }
};
</script>

<style lang="scss" scoped>
</style>