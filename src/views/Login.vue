<template>
  <div class="login">
    <!-- 头部信息展示区 -->
    <div class="header">
      <div class="title">
        闻雯饭庄
      </div>
    </div>
    <!-- 登录区域 -->
    <div class="loginArea">
      <div class="loginForm">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            size="large"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            size="large"
          />
          <div style="margin: 16px">
            <van-button color="linear-gradient(to right, #bdb4b7, #ea591d)" round block type="info" native-type="submit">
            提交
            </van-button>
          </div>
          <div class="signUp">
            <span @click="toRegister">没有账号？点击注册</span>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapMutations } from 'vuex'
// 异步加载  引入axios
import { post_json } from '@/http/axios'
import { Toast } from 'vant';

export default {
  data() {
    return {
      username: "趣多多",
      password: "1314520",
    };
  },
  methods: {
    // 引入vuex中的mutations
    ...mapMutations(['setToken']),
    // 登录
    async onSubmit(values) {
      // 配置参数
      let params = {
        username: this.username,
        password: this.password,
      }
      // 发送登录验证请求
      let res = await post_json('/user/login', params)
      // console.log(res);
      if (res.data.status == 200) {
        // 保存token
        this.setToken({token: res.data.data.token});
        // 跳转到首页
        this.$router.push('/manager/home')
      }else{
        // 提示错误信息
        Toast(res.data.message);
      }
    },
    // 跳转到注册
    toRegister(){
      this.$router.push('/register')
    }
  },
};
</script>

<style scoped>
/* 整体样式 */
.login {
  width: 100%;
  height: 100%;
  background-image: url(../../public/bg.jpg);
  background-size: 100% 100%;
  filter: opacity(0.9);
  /* background-image: linear-gradient(#ff4b1f, #ff9068); */
  overflow: hidden;
}
/* 头部样式 */
.header{
  width: 100%;
  position: absolute;
  left: 20px;
  top: 150px;

}
/* 标题样式 */
.header .title{
  font-family: 'webfont';
  font-size: 40px;
  color: white;
}
@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('//at.alicdn.com/t/webfont_5cfqve4kicf.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/webfont_5cfqve4kicf.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/webfont_5cfqve4kicf.woff2') format('woff2'),
  url('//at.alicdn.com/t/webfont_5cfqve4kicf.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/webfont_5cfqve4kicf.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/webfont_5cfqve4kicf.svg#NotoSansHans-Black') format('svg'); /* iOS 4.1- */
}
/* 中间登录输入区域 卡片样式 */
.loginArea {
  box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5); /*设置透明度为0.5*/
  transition: 0.3s;
  width: 90%;
  border-radius: 5px;
  margin: 369px auto;
  height: 240px;
  padding: 10px;
}
.loginArea:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 15, 15, 0.5);
  background-color: rgba(255, 255, 255, 0.5); /*设置透明度为0.5*/
}
/* 输入框整体样式 */
.loginForm{
  padding-top: 20px;
  background-color: rgba(255, 255, 255, 0.5); /*设置透明度为0.5*/
}
/* 注册样式 */
.signUp{
  color: #df8461;
  text-align: center;
}
</style>
