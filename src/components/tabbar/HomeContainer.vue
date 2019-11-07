<template>
  <div class="home-container">
    <!-- 卡片: 提示学生重要考试 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner strong-info">
          距离六级考试还有
          <strong>37</strong>天
        </div>
      </div>
    </div>

    <!-- 卡片: 教务系统 -->
    <div class="mui-card">
      <div class="mui-card-header">教务系统</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/syllabus">
                <span class="mui-icon mui-icon-extra mui-icon-extra-regist"></span>
                <div class="mui-media-body">课&nbsp;表</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/voluntary">
                <span class="mui-icon mui-icon-checkmarkempty"></span>
                <div class="mui-media-body">义工时</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/electron">
                <span class="mui-icon mui-icon-extra mui-icon-extra-classroom"></span>
                <div class="mui-media-body">电&nbsp;费</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 卡片:  -->
    <div class="mui-card">
      <div class="mui-card-header">Hi,你好呀!</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;感谢你下载使用《方寸》</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;《方寸》是我利用业余时间开发的一款软件，
            开发的初衷是为了解决教务系统的繁琐，功能不全的问题。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;记得大二刚开始的时候，一切从零开始，什么也不会但就是想把这个整出来。
            所以大三这段时间就在想能不能开发一款app来帮助我归纳这些信息，
            于是就有了它。
          </p>
        </div>
      </div>
      <div class="mui-card-footer right-info"> ——《方寸》</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.home-container {
  .mui-icon {
    font-size: 10px;
  }
  .strong-info {
    background-color: rgba(83, 82, 81, 0.29);
    color: white;
    font-size: 17px;
    text-align: center;
    strong {
      font-size: 25px;
    }
  }
  .right-info {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>