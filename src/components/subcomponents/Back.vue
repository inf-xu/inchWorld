<template>
  <mt-header fixed title="方寸" style="background-color: #CDCDCD;">
    <span slot="left" @click="goBack">
      <mt-button icon="back"></mt-button>
    </span>
  </mt-header>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>