<template>
  <div class="main">
    <div class="header">
      <a>
        <img src="../../assets/logo03_i.png" />
      </a>
      <h2 style="color: #929292">
        方
        <small>寸</small>之
        <small>间</small>
      </h2>
    </div>
    <div class="form">
      <div class="form-group">
        <!-- <label for>学号</label> -->
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
          <!-- <label for>密码</label> -->
          <a class="pull-right" href @click.prevent="forgetPwd()">无法登陆?</a>
        </div>
        <input
          type="password"
          class="form-control"
          v-model="password"
          name="password"
          placeholder="密码"
        />
      </div>
      <mt-button type="primary" size="large" style="margin-top: 20px" @click.prevent="login()">登陆</mt-button>
    </div>
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
  created() {
    this.init();
  },
  methods: {
    forgetPwd() {
      this.$store.commit("loginOut");
      this.init();
      Toast("已清除缓存,请重新登陆");
    },
    init() {
      if (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))["id"]) {
        const user = {
          name: this.$store.state.userInfo.id,
          password: this.$store.state.userInfo.password
        };
        this.reqLogin(user);
      } else {
        this.getKey().then(key => {
          this.publicKey = key;
          localStorage.setItem("pubKey", key);
        });
      }
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
      this.reqLogin(user);
    },
    reqLogin(user) {
      this.$http
        .post("api/loginin", user)
        .then(res => {
          if (res.body.status === 0) {
            Toast("success");
            this.$store.commit("addUserId", user);
            this.getUserInfo(user.name)
            this.$router.push("/home");
          } else {
            Toast("用户名或密码错误");
          }
        })
        .catch(err => {
          Toast("用户名或密码错误");
        });
    },
    getUserInfo(id) {
      this.$http
        .get("api/userinfo/" + id)
        .then(res => {
          if (res.body.status === 0) {
            const key = this.$store.getters.key;
            const user = JSON.parse(
              JSON.parse(this.$aes.decrypt(res.body.message, key))
            );
            this.$store.commit("addUserInfo", user);
          } else {
            Toast("前方通道拥挤");
          }
        })
        .catch(err => {
          Toast("前方通道拥挤");
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 10% 5% 0;
  color: #333;
  .header {
    // width: 90%;
    height: 50%;
    text-align: center;
    margin: auto 0;
    img {
      // margin: 20% 0;
      width: 95%;
      height: 95%;
    }
  }
  .form {
    height: 35%;
    padding: 5% 10%;
    margin: 10% 0 0;
    input {
      border-radius: 5px;
    }
    .pull-right {
      display: flex;
      flex-direction: row-reverse;
      font-size: 13px;
    }
  }
}
</style>