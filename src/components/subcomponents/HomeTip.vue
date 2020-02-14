<template>
  <div class="home-tip mui-card-content-inner mui-collapse">
    <p>&nbsp;&nbsp;&nbsp;&nbsp; 感谢你下载使用《方寸》</p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;目前小程序已经上线，
      微信小程序搜索"方寸教务"
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;这是一个聚合我们学校各个信息查询为一体的工具APP，也许你和我有一样的困扰，
      就是一旦要查看自己课表、义工时和成绩时，就要在各个公众号找链接查询，一套功夫下来，甚至自己都忘了要干什么。
    </p>

    <p>&nbsp;&nbsp;&nbsp;&nbsp;为了方便查询，我在业余开发了这一款工具，初衷就为了解放自己的双手，同时也是为了简化教务系统繁琐的操作。</p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;可能是个人能力的原因，你使用时可能感到并不流畅，偶尔还会蹦出几个bug，界面也许不能让你满意，在这里我替UI设计师和开发者向你道歉，
      个人开发者实在是没钱换服务器，但是我会尽最大的努力。
    </p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;由于不同系统之间密码可能不同，因此当你在查询体测成绩的时候，需输入体育系统的密码；当你查询自己寝室电费的时候，第一次需要手动输入密码.</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;你不用担心信息泄露问题，目前软件开源在github上，如果你在使用过程中出现了一些问题，可以向我提issue，感激不尽。</p>
    <p class="right-info">——《方寸》</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.home-tip {
  p:first-child {
    font-weight: bold;
    color: black;
  }
  .right-info {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>