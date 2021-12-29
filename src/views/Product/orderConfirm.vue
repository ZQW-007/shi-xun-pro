<template>
  <div class="orderConfirm">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="订单确认"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 整体背景 -->
    <div class="bg">
      <!-- 服务地址选择与显示 -->
      <van-cell size="large" title="配送地址" icon="location-o" @click="getAddressList">
        <template #label>
          <!-- 如果后期加入默认地址 可在计算属性中进行筛选 进行显示 目前默认显示数组的第一个地址 -->
          <van-row>
            <van-col span="8">姓名:{{username}}</van-col>
            <van-col span="16">电话:{{tel}}</van-col>
          </van-row>
          <van-row>
            <van-col span="24">地址:{{address}}</van-col>
          </van-row>
        </template>
      </van-cell>
      <!-- 订单详情 -->
      <van-cell size="large" title="订单详情" icon="orders-o" >
        <template #label>
          <van-row v-for="line of orderLines.values()" :key="line.productId">
            <van-col span="8">{{line.name}}</van-col>
            <van-col span="8">￥{{line.price}}</van-col>
            <van-col span="8">x{{line.num}}</van-col>
          </van-row>
          <van-row style="border-top:1px dotted #ededed">
            <van-col span="13"></van-col>
            <van-col span="13">总计:￥{{total}}</van-col>
          </van-row>
        </template>
      </van-cell>
      <!-- 买家留言 -->
      <van-field
        v-model="buyerMessage"
        rows="2"
        autosize
        label="买家留言"
        left-icon="comment-o"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
    <!-- 地址选择器 -->
    <van-action-sheet v-model="showAddress" title="选择地址">
      <div class="content">
        <van-address-list
          v-model="chosenAddressId"
          :list="addressList"
          add-button-text="确定"
          @add="onSave"
        />
      </div>
    </van-action-sheet>
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
        <div style="margin: 16px;">
          <van-button color="#7879FF" round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-action-sheet>
    <!-- 提交按钮 -->
    <div class="confirm_btn" @click="confirm">确认提交</div>
  </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import {Dialog} from 'vant'
export default {
  data() {
    return {
      // 被选中的地址id
      chosenAddressId: '1',
      // 面板弹出控制
      showAddress: false,
      // 姓名
      username: '',
      // 电话
      tel: '',
      // 地址
      address: '',
      // 充值框弹出
      balanceShow: false,
      // 充值金额
      balance: '',
      // 买家留言
      buyerMessage:''
    }
  },
  created() {
    // 获取用户信息
    this.getUserInfo().then(r => {
      // 获取地址信息  并设置默认地址
      this.getAddressData(this.userInfo.id).then(r => {
        // 设置默认地址
        // 姓名
        this.username = this.addressData[0].realname
        // 电话
        this.tel = this.addressData[0].telephone
        // 地址
        this.address = this.addressData[0].province + this.addressData[0].city + this.addressData[0].area + this.addressData[0].address
        // 地址列表默认id
        this.chosenAddressId = this.addressData[0].id
      })
    })
  },
  computed:{
    // 获取保存的订单信息
    ...mapState('shopcart',['orderLines']),
    // 获取订单总价
    ...mapGetters('shopcart',['total']),
    // 获取地址列表
    ...mapState('address',['addressData']),
    // 获取用户信息
    ...mapState('user',['userInfo']),
    // 根据地址数据生成匹配组件的地址数据
    addressList(){
      // 筛选地址数据 生成匹配组件的数据
      let addressArr = this.addressData
      let addressList = []
      if (!addressArr) {
        return;
      }
      addressArr.forEach((item,index) =>{
        let addressObj = {}
        addressObj.id = item.id,
        addressObj.name = item.realname,
        addressObj.tel = item.telephone,
        addressObj.address = item.province + item.city + item.area + item.address,
        addressObj.isDefault = item.isDefault
        addressList.push(addressObj)
      });
      return addressList;
    }
  },
  methods: {
    // 获取地址数据
    ...mapActions('address',['getAddressData']),
    // 获取用户信息
    ...mapActions('user',['getUserInfo']),
    // 提交订单
    ...mapActions('order',['SubmitOrder']),
    // 余额充值
    ...mapActions('recharge',['getRecharge']),
    // 获取地址数据
    getAddressList(){
      // 打开actionSheet
      this.showAddress = true
      // 获取地址数据
      this.getAddressData(this.userInfo.id)
    },
    // 选择地址确认
    onSave(){
      // console.log(this.chosenAddressId);
      // 根据地址id筛选当前选择的地址
      let addressObj = this.addressData.filter((item,index) =>{
        return item.id === this.chosenAddressId
      });
      // 根据选择的地址进行地址的更新
      this.username = addressObj[0].username
      this.tel = addressObj[0].telephone
      this.address = addressObj[0].province + addressObj[0].city + addressObj[0].area + addressObj[0].address
      // 隐藏地址选择面板
      this.showAddress = false
    },
    // 提交订单
    confirm(){
      // 保存订单信息
      // 参数
      var obj = {
          addressId:this.chosenAddressId,
          customerId:this.userInfo.id,
          buyerMessage: this.buyerMessage,
          orderLines:Array.from(this.orderLines.values())
      }
      this.SubmitOrder(obj)
      .then((response)=>{
        // console.log(response);
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
        }else if(response.data.message == '操作成功'){
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
      })
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
    onClickLeft(){
      this.$router.go(-1)
      console.log();
      setTimeout(() => {
        this.$store.state.shopcart.orderLines.clear()
      }, 500);
    },
  },
};
</script>

<style scoped>
/* 整体背景颜色 */
.bg .van-cell{
  margin: 10px auto;
  /* height: 500px; */
  /* background-color: red; */
  box-shadow: 2px 2px 2px 2px rgba(158, 117, 255, 0.2);
  transition: 0.3s;
  width: 95%;
  border-radius: 5px;
}
/* 提交按钮 */
.confirm_btn {
  width: 53%;
  height: 40px;
  background-image: linear-gradient(to right,#7579ff,#bf73ff);
  text-align: center;
  color: #fff;
  border-radius: 22px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 2em;
  cursor: pointer;
}
.van-icon-edit{
  display: none;  
}
/* 充值 */
.cz{
  height: 80px;
  text-align: center;
}
</style>