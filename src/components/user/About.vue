<template>
  <div class="about-container">
    <!-- header -->
    <aboutNav :name="'关于'"></aboutNav>

    <!-- logo -->
    <div class="logo nav-translate">
      <img src="../../assets/logo03_i.png" />
      <span>方寸:简易教务系统</span>
    </div>

    <!-- about -->
    <div class="about" style="margin-top:90px;">
      <hr />
      <h3>介绍</h3>
      <p>《方寸》是一个聚合我们学校各个信息查询为一体的工具APP，你可以查看课表、成绩、义工时、体测打卡、电费和图书馆藏等信息。通过订阅列表，你可以获得主流新闻咨询的最新消息，方便你的日常使用。</p>
    </div>
    <hr />

    <!-- function -->
    <div class="about">
      <h3>功能特性</h3>
      <p>
        1. 本周课表查询
        <br />2. 义工时查询,搜索功能
        <br />3. 电费查询,自动保存房间
        <br />4. 考研日子
        <br />5. 天气和每日一言
        <br />6. 新闻资讯订阅
        <br />7. 成绩查询,搜索功能
        <br />8. 体测打卡查询
        <br />9. 图书馆藏查询,超星数据库
        <br />10. 个人信息二维码
        <br />11. 自定义主题颜色
        <br />
      </p>
    </div>
    <hr />

    <!-- 开发者 -->
    <div class="about">
      <h3>开发者</h3>
      <img src="../../assets/about-daisy.jpg" />
    </div>
    <hr />

    <!-- 联系我们 -->
    <div class="about relation">
      <h3>联系我们</h3>
      <p>
        邮箱:daisy2891649549@163.com
        <br />QQ:2891649549
      </p>
    </div>
    <div style="margin-top: 20px; height: 30px"></div>

  </div>
</template>

<script>
import aboutNav from "../subcomponents/NavOther.vue";

export default {
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  components: {
    aboutNav
  }
};
</script>

<style lang="scss" scoped>
.about-container {
  padding: 10px;
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 160px;

    img {
      width: 100px;
      height: 100px;
    }

    span {
      margin: 15px 0;
      letter-spacing: 10px;
      font-size: 18px;
    }
  }
  .about {
    padding: 10px;
    img {
      width: 50px;
      height: 50px;
    }

    p {
      margin-top: 15px;
    }
  }
}
</style>