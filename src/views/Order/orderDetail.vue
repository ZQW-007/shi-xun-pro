<template>
  <div class="orderDetail">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 商品信息展示 -->
    <div v-if="$route.query.item.orderLines.length == 0">
      <van-empty description="暂时没有数据" />
    </div>
    <div v-else class="orderLines">
      <van-card
        v-for="item in $route.query.item.orderLines"
        :key="item.id"
        :num="item.number"
        :price="item.price + '.00'"
        :desc="item.product.description"
        :title="item.product.name"
        :thumb="item.product.photo"
      />
      <van-divider />
      <p class="count">
        总计:<span style="color: red">¥{{ $route.query.item.total }}</span>
      </p>
      <van-divider />
      <div class="address">
        <p>配送地址：{{$route.query.item.address.province+''+$route.query.item.address.city+''+$route.query.item.address.area+''+$route.query.item.address.address}}</p>
        <p>联系方式：{{$route.query.item.customer.username}} ({{$route.query.item.customer.telephone}})</p>
        <p>下单时间：{{new Date(parseInt($route.query.item.orderTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
        <p>买家留言：{{$route.query.item.buyerMessage}}</p>
        <p>{{ $route.query.item.status}}</p>
      </div>
      <van-button v-if="$route.query.item.status == '待支付'" type="primary" @click="orderPay">支付</van-button>
    </div>
    <!-- 充值 -->
    <van-action-sheet v-model="balanceShow" title="充值" @close="toClose">
      <van-form validate-first @submit="topUp">
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="balance"
          name="validator"
          label="充值金额"
          placeholder="请输入充值金额"
          :rules="[{ validator, message: '单次充值金额不超过1000元' }]"
        />
          <van-button color="#7879FF" round block type="info" native-type="submit">提交</van-button>
      </van-form>
    </van-action-sheet>
  </div>
</template>

<script>
import {get} from '@/http/axios'
import {mapState,mapActions,mapGetters} from 'vuex'
import {Dialog} from 'vant'
export default {
  data() {
    return {
      // 充值框弹出
      balanceShow: false,
      // 充值金额
      balance: '',
    };
  },
  computed:{
    // 获取用户信息
    ...mapState('user',['userInfo']),
  },
  methods: {
    // 余额充值
    ...mapActions('recharge',['getRecharge']),
    async orderPay(){
      console.log(this.$route.query.item.id);
      let response = await get('/app/order/pay?id='+this.$route.query.item.id)
      if (response.data.message == '余额不足!') {
        Dialog.confirm({
          confirmButtonColor: '#7879FF',
          message: "当前余额不足，是否充值？",
        })
        .then(() => {
          // on confirm
          // 弹出充值框
          this.balanceShow = true
        })
        .catch(() => {
          // on cancel
        });
      }else if(response.data.message == '支付成功'){
        this.$notify({
          type:'success',
          message:response.data.message
        });
        // 路由跳转至订单页面
        this.$router.push({path:'/manager/order'})
        .then((res)=>{
            // 获取订单数据
        })
      }else{
        this.$notify({
          type:'danger',
          message:response.data.message
        });
      }
    },
    // 充值金额校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      if (val < 0 || val > 1000) {
        return false
      }else{
        return true
      }
    },
    // 充值
    topUp(){
      console.log(this.balance,this.userInfo.id);
      let data = {
        customerId: this.userInfo.id,
        money: this.balance
      }
      this.getRecharge(data).then(r => {
        console.log(r);
        if (r.data.status == 200) {
          this.$notify({
            type:'success',
            message:r.data.message
          });
          this.balanceShow = false
        }else{
           this.$notify({
            type:'danger',
            message:r.data.message
          });
        }
      })
      // 实现充值逻辑
    },
    // 取消弹框
    toClose(){
      // 余额置空
      this.balance = ''
    },
    // 返回上一级页面
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.van-card {
  box-shadow: 1px 1px 1px 1px rgba(143, 66, 255, 0.4);
  background-color: white;
  width: 95%;
  border-radius: 5px;
  margin: 5px auto;
  padding: 5px;
}
.count {
  text-align: right;
  padding-right: 11px;
  color: #333;
  font-size: 12px;
 }
.address {
  background-color: #f8f8f8;
  padding: 1em 0.5em;
}
.address p {
  margin: 0;
  margin-bottom: 0.5em;
  font-size: 12px;
  color: #999;
}
.address p:last-child {
  margin-bottom: 0;
  text-align: right;
}

/* 支付按钮提交按钮样式 */
.van-button.van-button--normal{
  position: absolute;
  right: 10px;
  margin-top: 10px;
  width: 140px;
}

.van-action-sheet{
  height: 200px;
}
</style>