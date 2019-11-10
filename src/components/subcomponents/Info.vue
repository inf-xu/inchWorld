<template>
  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner inner-info" v-html="info"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: ["info"]
};
</script>

<style lang="scss" scoped>
.inner-info {
    text-align: center;
    font-size: 16px;
  }
</style>