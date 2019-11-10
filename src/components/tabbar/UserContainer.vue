<template>
  <div class="user-container">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner head-img">
          <img src="../../assets/about-daisy.jpg" />
          <div class="mui-media-body">
            徐瑞
            <p>计算机工程学院</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/user/score">
                <span class="mui-icon mui-icon-extra mui-icon-extra-university"></span>
                <div class="mui-media-body">查成绩</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/user/physical">
                <span class="mui-icon mui-icon-extra mui-icon-extra-rank"></span>
                <div class="mui-media-body">查体测</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/user/book">
                <span class="mui-icon mui-icon-extra mui-icon-extra-xiaoshuo"></span>
                <div class="mui-media-body">查图书</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="mui-card-footer">白马清欢无别事,我在等风也等你。</div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">设置</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <router-link href="#privacy" class="mui-navigate-right" to="/privacy">隐私</router-link>
            </li>
            <li class="mui-table-view-cell">
              <router-link href="#general" class="mui-navigate-right" to="/about">帮助</router-link>
            </li>
          </ul>
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <router-link href="#about" class="mui-navigate-right" to="/about">
                关于方寸
                <router-link class="mui-pull-right update" to="/about">V1.1.0</router-link>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" style="text-align: center;">
            <router-link to="/loginout">退出登录</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user-container {
  .mui-card {
    .head-img {
      display: flex;
      flex-direction: row;
      height: 80px;
      img {
        width: 50px;
      }
      .mui-media-body {
        margin-left: 20px;
      }
    }
    .mui-card-footer {
      display: flex;
      justify-content: center;
      font-style: italic;
      font-weight: bold;
    }
  }
}
</style>