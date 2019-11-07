<template>
  <div class="main">
    <div class="header">
      <a href="/">
        <img src="https://tse1-mm.cn.bing.net/th?id=OIP.Y8i8YSO13-l6bfdCYcoS3gHaEK&w=300&h=168&c=7&o=5&dpr=1.25&pid=1.7" alt />
      </a>
      <h1>方寸之间</h1>
    </div>
    <form id="login_form">
      <div class="form-group">
        <label for>学号</label>
        <input type="text" class="form-control" v-model="name" name="text" placeholder="accid" autofocus />
      </div>
      <div class="form-group">
        <div class="flex-pwd">
          <label for>密码</label>
          <a class="pull-right" href @click.prevent="forgetPwd()">忘记密码?</a>
        </div>
        <input type="password" class="form-control" v-model="password" name="password" placeholder="password" />
      </div>
      <div class="checkbox">
        <mt-switch>记住我</mt-switch>
      </div>
      <button type="submit" class="btn btn-success btn-block submit" @click.prevent="login()">登陆</button>
    </form>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    forgetPwd() {
      Toast('看来你只能自己去图书馆重置密码了')
    },
    login() {
      const user = {
        name: this.name, 
        password: this.password
      }
      

      this.$http.post('loginin', user).then(res => {
        if (res.body.status === 0) {
          Toast(res.body.message)
          //window.location.href = ''
        } else {
          Toast(res.body.message)
        }
      }).catch((err) => {
        Toast('服务器被炸了')
      }) 
      
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 340px;
  margin: 0 auto;
  margin-top: 50px;
  color: #333;
  background-color: #FDFDFD;
  .header {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 35px;
    }
    img {
        width: 100%;
        height: 100%;
    }
  }
  form {
    padding: 30px;
    margin-bottom: 15px;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    background-color: #fff;
    .flex-pwd {
      display: flex;
      justify-content: space-between;
    }
    .pull-right {
      font-size: 13px;
    }
    .submit {
        margin-top: 40px;
    }
  }
}
</style>