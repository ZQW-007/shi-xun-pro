<template>
  <div class="manager">
    <!-- 用于接受管理页面，首页，订单页，我的页面 -->
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24">
      <van-tabbar-item icon="home-o" to="/manager/home">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/manager/order">订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/manager/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped>
</style>