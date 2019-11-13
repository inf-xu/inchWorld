<template>
  <div>
      <bookSearch @getText="getBookList" :info="'book'" :type="'text'"></bookSearch>

      <bookInfo :info="'请输入要查询的图书名,例如<strong>人月神话</strong>'" v-show="!flag"></bookInfo>

      <div class="mui-card" v-show="flag" v-for="(item, index) in bookList" :key="index">
      <div class="mui-card-header">{{ item.name }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <table class="table table-striped">
            <tr>
              <td>作者</td>
              <td>{{ item.author | dataFormat}}</td>
            </tr>
            <tr>
              <td>ISBN</td>
              <td>{{ item.ISBN | dataFormat}}</td>
            </tr>
            <tr>
              <td>索书号</td>
              <td>{{ item.callNum | dataFormat}}</td>
            </tr>
            <tr>
              <td>出版社</td>
              <td>{{ item.publish | dataFormat}}</td>
            </tr>
            <tr>
              <td>出版时间</td>
              <td>{{ item.time | dataFormat}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bookSearch from "../subcomponents/HandleSearch.vue";
import bookInfo from "../subcomponents/Info.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      bookList: [],
      indexPage: 0,
      flag: false,
      bookNm: ''
    }
  },
  methods: {
    getBookList(name) {
      this.bookNm = name
      const formData = {
        bookName: name,
        num: this.indexPage
      }
      this.$http.post('api/getbook', formData).then(res => {
        if (res.body.status === 0) {
            this.bookList = res.body.message
            this.flag = true
          } else {
            Toast('服务器被炸了')
          }
      }).catch(err => {
        Toast('服务器被炸了')
      })
    }
  },
  components: {
    bookSearch,
    bookInfo
  }
}
</script>

<style lang="scss" scoped>

</style>