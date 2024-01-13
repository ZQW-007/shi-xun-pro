<template>
  <div class="orderDetail">
    <!-- 头部 -->
    <div class="header">
      <!-- 导航栏 -->
      <van-nav-bar
        title="订单详情"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <div v-if="order.status == '待支付'">
            <span>支付</span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 内容 -->
    <div class="container">
      <div class="status">
        <!-- 订单状态 -->
        订单 - {{ order.status }}
      </div>
      <div class="info">
        <!-- 收货地址及其他信息 -->
        <div class="address">
          <span class="title">地址：</span>
          <span>{{ order.address.province }}{{ order.address.city }}{{ order.address.area }}</span>
        </div>
        <div class="name">
          <span class="title">姓名：</span>
          <span>{{ order.address.realname }}</span>
        </div>
        <div class="tel">
          <span class="title">电话：</span>
          <span>{{ order.address.telephone }}</span>
        </div>
        <div class="message">
          <span class="title">备注：</span>
          <span>{{ order.buyerMessage }}</span>
        </div>
      </div>
      <div class="orderLines">
        <!-- 订单菜品 -->
        <van-card
          v-for="item in order.orderLines"
          :key="item.id"
          :num="item.num"
          :price="item.price.toFixed(2)"
          :title="item.name"
          :thumb="item.photo"
        >
          <template #desc>
            <!-- 描述信息最多显示一行，超出部分省略 -->
            <div class="van-ellipsis">
              {{ item.product.description }}
            </div>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/http/axios.js'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data(){
    return {
      order: JSON.parse(this.$route.query.item)
    }
  },
  methods: {
    // 返回
    onClickLeft(){
      this.$router.go(-1)
    },
    // 支付
    async onClickRight(){
      let res = await get('/app/order/pay',{
        id: this.order.id
      })
      if(res.data.status == 200){
        Toast.success(res.data.message)
        this.$router.push('/manager/order')
      }else{
        Toast.fail(res.data.message)
      }
      // console.log(res.data.message)
    }
  },
  created(){
    console.log(this.order)
    // console.log(this.$route.query.item)
  }
}
</script>
<style lang="less" scoped>
.header{
  .van-nav-bar{
    background-color: #ee0a24;
    ::v-deep .van-icon{
      color: #fff;
    }
    ::v-deep .van-nav-bar__title{
      color: #fff;
    }
    ::v-deep .van-nav-bar__right{
      color: #fff;
    }
  }
}
.container{
  // padding-top: 46px;
  padding: 46px 10px 10px;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
  background-color: #f2f3f5;
  .status{
    margin-top: 10px;
  }
  .info{
    box-shadow: 0 0 6px 0 #ccc;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    color: #898989;
    .address,.message{
      width: 100%;
    }
    .name,.tel{
      width: 50%;
      margin: 5px 0;
    }
    .title{
      color: #666666;
    }
  }
  .orderLines{
    box-shadow: 0 0 6px 0 #ccc;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    .van-card__title{
      font-size: 14px;
      line-height: 25px;
      font-weight: 600;
    }
  }
}
</style>