<template>
  <div class="setting-container">
    <!-- header -->
    <setNav :name="'设置'" :info="'为主题设置你喜欢的颜色'"></setNav>

    <div class="nav-translate" style="height: 90px"></div>

    <div class="color-list">
      <div
        class="color-li"
        v-for="item in colorList"
        :key="item.color"
        @click.prevent="changeColor(item)"
        :style="{'background-color': item.color}"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import setNav from "../subcomponents/NavOther.vue";

export default {
  data() {
    return {
      colorList: [
        {
          color: "#015DAD",
          name: "典雅"
        },
        {
          color: "#FF719C",
          name: "哔哩"
        },
        {
          color: "#ff8080",
          name: "故事"
        },
        {
          color: "#80D8FF",
          name: "微风"
        },
        {
          color: "#85B8CF",
          name: "青衣"
        },
        {
          color: "#90C652",
          name: "和煦"
        },
        {
          color: "#6B4D9C",
          name: "高贵"
        },
        {
          color: "#D8AA5A",
          name: "回忆"
        },
        {
          color: "#FC9F9D",
          name: "少女"
        },
        {
          color: "#0A9A84",
          name: "小草"
        },
        {
          color: "#61BC69",
          name: "酷安"
        },
        {
          color: "#12AEF3",
          name: "舒洁"
        },
        {
          color: "#393C21",
          name: "琉璃"
        }
      ]
    };
  },
  methods: {
    changeColor(item) {
      MessageBox.confirm("", {
        title: "提示",
        message: "确认将颜色修改问" + item.name + "吗?",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            localStorage.setItem("themeColor", item.color);
          }
        })
        .catch(error => {});
    },
  },
  components: {
    setNav
  }
};
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 10px;

  .color-list {
    .color-li {
      display: inline-block;
      width: 47%;
      margin: 0 1.3% 10px 1.3%;
      height: 220px;
      color: white;
      font-size: 18px;
      border-radius: 7px;

      padding: 15px;
    }
  }
}
</style>