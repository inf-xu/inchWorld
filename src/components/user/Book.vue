<template>
  <div class="book-container">
    <!-- nav -->
    <header class="absolute-nav">
      <div class="home-nav">
        <div class="nav-left">
          <span class="mui-icon iconfont icon-zuojiantou" @click.prevent="goback"></span>
        </div>
        <div class="nav-right">
          <div class="search bar8">
            <form>
              <input type="text" v-model="bookNm" @keyup.enter="getBookList()" placeholder="图书查询" />
              <input v-show="false"/>
              <button type="button">
                <span class="mui-icon iconfont icon-sousuo" style="font-weight: bold"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>

    <div class="list-commend nav-translate">
      <h4>推荐阅读</h4>
      <li class="li-commend" v-for="item in commendBook" :key="item.image">
        <img :src="item.image" />
        <span>{{item.name}}</span>
      </li>
      <li
        class="li-commend"
        v-for="(item, index) in bookList"
        :key="index"
        @click.prevent="getBookDetail(item)"
      >
        <div class="search-book" :style="{'background-image': randomColor()}">点击查看详情</div>
        <span>{{item.name}}</span>
      </li>
    </div>

    <mt-popup class="popup" v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <div class="mui-card-header">{{ book.name }}</div>
      <div class="mui-card-content-inner">
        <table class="table table-striped">
          <tr>
            <td>作者</td>
            <td>{{ book.author| dataFormat }}</td>
          </tr>
          <tr>
            <td>ISBN</td>
            <td>{{book.ISBN | dataFormat }}</td>
          </tr>
          <tr>
            <td>索书号</td>
            <td>{{ book.callNum | dataFormat}}</td>
          </tr>
          <tr>
            <td>出版社</td>
            <td>{{ book.publish | dataFormat }}</td>
          </tr>
          <tr>
            <td>出版时间</td>
            <td>{{ book.time | dataFormat }}</td>
          </tr>
        </table>
      </div>
    </mt-popup>

    <div style="margin-top:100px; height: 60px; clear:both;"></div>
    <div style="margin-top: 20px; height: 30px"></div>

  </div>
</template>

<script>
import { RandomColor } from "../../common/utils.js";
import { Toast, Popup } from "mint-ui";

export default {
  data() {
    return {
      bookList: [],
      commendBook: [
        {
          name: "追风筝的人",
          image: "https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
        },
        {
          name: "解忧杂货店",
          image: "https://img3.doubanio.com/view/subject/l/public/s27264181.jpg"
        },
        {
          name: "小王子",
          image: "https://img3.doubanio.com/view/subject/l/public/s1103152.jpg"
        },
        {
          name: "白夜行",
          image: "https://img3.doubanio.com/view/subject/l/public/s4610502.jpg"
        },
        {
          name: "活着",
          image: "https://img3.doubanio.com/view/subject/l/public/s29053580.jpg"
        }
      ],
      indexPage: 0,
      popupVisible: false,
      bookNm: "",
      book: {}
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getBookDetail(book) {
      this.popupVisible = true;
      this.book = book;
    },
    getBookList() {
      const formData = {
        bookName: this.bookNm,
        num: this.indexPage
      };
      this.$axios
        .post("api/getbook", this.$qs.stringify(formData))
        .then(res => {
          if (res.data.status === 0) {
            this.bookList = res.data.message;
          } else {
            Toast("服务器繁忙,请稍后查询");
          }
        })
        .catch(err => {
          Toast("服务器繁忙,请稍后查询");
        });
    },
    randomColor() {
      let color =  RandomColor()
      return `linear-gradient(${color}, #ffffff)`;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>