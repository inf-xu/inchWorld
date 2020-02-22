<template>
  <div class="privary-container">
    <!-- header -->
    <privaryNav :name="'隐私与安全'"></privaryNav>

    <div class="nav-translate" style="height: 90px"></div>
    <h4>前言</h4>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;感谢使用方寸提供的服务，在这个大数据时代隐私泄露变得让每一个担心起来，深知个人信息对您的重要性，我一向庄严承诺保护使用我的产品和服务将保护您的个人信息及隐私安全。您在使用方寸时，我不会收集和使用您的相关个人信息。我希望通过《方寸隐私保护政策》向您说明我在处理相关个人信息时对应的处理规则等相关事宜，以便更好的保障您的权益。</p>
    <h4>关于学号密码问题</h4>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;您在正确登陆进入方寸首页，您的学号和密码经过网络传输到服务器，这个传输过程他人无法获取您的真实密码。为了保证密码的安全性，使用了RSA非对称加密算法，除了算法本身知道其他人非法获得也无从下手。
      <br />&nbsp;&nbsp;&nbsp;&nbsp;关于密码存储问题，目前密码是经过多次不可逆加密存储，本人无法拿到您的密码，请您放心食用。经过新一轮的版本升级，目前重要数据都是加密传送，当然在您的手机本地存储了您的学号和加密过后的密码，以便下一次登录使用，如需切换账号请进入
      <strong>我的</strong>进行切换。
    </p>
    <h4>关于软件安全问题</h4>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;任何软件都不能保证绝对安全，这是一个聚合多个网站的工具APP，因此您的所有查询请求将转发到相应的查询网站，如果您在很使用过程中发现部分信息无法获取，这可能是相关网站关闭造成的，比如教务系统寒暑假会关闭一段时间。
      <br />&nbsp;&nbsp;&nbsp;&nbsp;据传教务系统将进行重写，方寸不能保证到时候继续为您提供服务。如果您是本专业的大佬，请您手下留情，我只是一个小小的个人开发者，真的顶不住各位的爆破。
    </p>
    <h4>关于开源问题</h4>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;目前项目开源在github上，欢迎提issue，这个是项目地址
      <a
        href="https://github.com/KDaisyers/inchWorld"
      >https://github.com/KDaisyers/inchWorld</a>，软件无广告、无收益、无后台，以下是开源协议：
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;The MIT License (MIT)
      <br />&nbsp;&nbsp;&nbsp;&nbsp;Copyright (c) 2014 connors and other contributors
      <br />Permission is hereby granted, free of charge, to any person obtaining a copy of
      this software and associated documentation files (the "Software"), to deal in
      the Software without restriction, including without limitation the rights to
      use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
      the Software, and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
      <br />&nbsp;&nbsp;&nbsp;&nbsp;The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
      <br />&nbsp;&nbsp;&nbsp;&nbsp;THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
      FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
      COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
      IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </p>
    <h4>如有疑问</h4>
    <p>
      开发者邮箱:
      <br />daisy2891649549@163.com
    </p>
    <div style="margin-top: 20px; height: 50px"></div>

  </div>
</template>

<script>
import privaryNav from "../subcomponents/NavOther.vue";

export default {
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  components: {
    privaryNav
  }
};
</script>

<style lang="scss" scoped>
.privary-container {
  padding: 10px;

  h2 {
    text-align: center;
    margin: 5px 0 30px;
  }

  h4 {
    margin: 0 0 15px;
  }

  p {
    font-size: 16px;
  }

  p:last-child {
    color: blueviolet;
  }
}
</style>