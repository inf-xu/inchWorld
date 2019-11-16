<template>
  <div class="main">
    <div class="header">
      <a>
        <img src="../../assets/logo.png" />
      </a>
      <h1>方寸之间</h1>
    </div>
    <form id="login_form">
      <div class="form-group">
        <label for>学号</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          name="text"
          placeholder="学号"
          autofocus
        />
      </div>
      <div class="form-group">
        <div class="flex-pwd">
          <label for>密码</label>
          <a class="pull-right" href @click.prevent="forgetPwd()">忘记密码?</a>
        </div>
        <input
          type="password"
          class="form-control"
          v-model="password"
          name="password"
          placeholder="密码"
        />
      </div>
      <button type="submit" class="btn btn-success btn-block submit" @click.prevent="login()">登陆</button>
    </form>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { JSEncrypt } from "jsencrypt";

export default {
  data() {
    return {
      name: "",
      password: "",
      publicKey: ""
    };
  },
  mounted: function() {
    this.getKey().then(key => {
      this.publicKey = key;
      localStorage.setItem("pubKey", key);
    });
  },
  methods: {
    forgetPwd() {
      Toast("看来你只能自己去图书馆重置密码了");
    },
    getKey() {
      return new Promise((reslove, reject) => {
        this.$http
          .get("api/key")
          .then(res => {
            if (res.body.status === 0) {
              reslove(res.body.publicDer);
            }
            reject(0);
          })
          .catch(err => {
            reject();
          });
      });
    },
    login() {
      if (this.name.trim() == "" || this.password.trim() == "")
        return Toast("用户名或密码不能为空");
      const user = {
        name: this.name.trim()
      };
      const pwd = this.password.trim();
      let encryptor = new JSEncrypt();
      const key = localStorage.getItem("pubKey");
      encryptor.setPublicKey(key);
      let encodemess = encryptor.encrypt(pwd);
      user.password = encodemess;

      this.$http
        .post("api/loginin", user)
        .then(res => {
          if (res.body.status === 0) {
            Toast(res.body.message);
            this.$store.commit("addUserId", user.name);
            this.$store.commit("setToken", res.body.status);
            this.$router.push("/home");
          } else {
            Toast("用户名或密码错误");
          }
        })
        .catch(err => {
          Toast("用户名或密码错误");
        });
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
  background-color: #fdfdfd;
  .header {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 35px;
    }
    img {
      width: 200px;
      height: 200px;
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