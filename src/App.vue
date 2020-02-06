<template>
  <div class="app-container">
    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab mui-active" v-show="flag">
      <router-link class="mui-tab-item-llb" to="/home">
        <span
          class="mui-icon mui-icon-home"
          :class="{'path-active': (path === '/home' ? true : false)}"
        ></span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/todo">
        <span
          class="mui-icon mui-icon-extra mui-icon-extra-topic"
          :class="{'path-active': (path === '/todo' ? true : false)}"
        ></span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/user">
        <span
          class="mui-icon mui-icon-person-filled"
          :class="{'path-active': (path === '/user' ? true : false)}"
        ></span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      path: this.$route.path
    };
  },
  created() {
    this.flag = this.$route.path === "/login" ? false : true;
  },
  watch: {
    "$route.path": function(newVal) {
      // console.log(newVal);
      this.path = newVal;
      if (newVal === "/login") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  padding-bottom: 50px;
  overflow-x: hidden;
}

.path-active {
  color: #1aad19;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}

.mui-bar-tab .mui-tab-item-llb .mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>