<template>
  <div class="privary-container">
    <mt-header fixed title="方寸" style="background-color: #CDCDCD;">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>

    <div class="mui-card">
      <div class="mui-card-header">
        关于学号和密码问题
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          1. 学号密码传输过程中采用RSA加密算法,非明文传输;<br />
          2. 学号密码数据采用多次md5加密,本人无法拿到用户密码;<br />
          3. 尚未开启记住密码功能;
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">
        关于软件安全问题
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          1. 任何软件不能保证绝对安全;<br />
          2. 所有请求都转发到相应的查询网站;<br />
          3. 无任何后台，不可获得用户信息;<br />
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">
        关于开源问题
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          1. 前端已在github开源，后端有开源倾向;<br />
          2. 无广告，无收益，无后台;
        </div>
      </div>
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
.privary-container {
  .mui-card {
    margin-top: 50px;
  }
}
</style>