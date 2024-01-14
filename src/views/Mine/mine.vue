<template>
  <div class="mine">
    <!-- 背景信息 -->
    <div class="bg"></div>
    <!-- 头部用户信息 -->
    <div class="user">
      <div class="photo">
        <img width="100%" height="100%" src="../../assets/bg.jpg" />
      </div>
      <p class="name">{{ userInfo.username }}</p>
      <div class="flex">
        <div class="flex_item">
          <p>账户余额</p>
          <p>{{userInfo.balance}}</p>
        </div>
        <div class="flex_item">
          <van-button class="van-btn" round type="info" @click="toRecharge">充值</van-button>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="cellArea">
      <van-cell is-link to="address">
        <img width="20px" src="../../assets/address.png" alt="" />
        <div class="spanTitle">常用地址</div>
      </van-cell>
      <van-cell is-link>
        <img width="20px" src="../../assets/lianxi.png" alt="" />
        <div class="spanTitle">联系我们</div>
      </van-cell>
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
        <div style="margin: 16px;">
          <van-button color="#7879FF" round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-action-sheet>
    <!-- 退出按钮 -->
    <div class="logout_btn" @click="logout">退出登录</div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapActions, mapState, mapMutations } from "vuex";
// 调用弹框
import { Dialog } from "vant";
export default {
  data() {
    return {
      // 充值框弹出
      balanceShow: false,
      // 充值金额
      balance: '',
    };
  },
  created() {
    // 调用获取用户信息方法
    this.getUserInfo();
  },
  methods: {
    ...mapActions("user", ["getUserInfo"]),
    ...mapMutations(["delToken"]),
    // 余额充值
    ...mapActions('recharge',['getRecharge']),
    // 退出 清空token
    logout() {
      Dialog.confirm({
        confirmButtonColor: '#7879FF',
        message: "是否退出登录？",
      })
        .then(() => {
          // on confirm
          this.delToken({ token: "" });
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
    // 弹出充值框
    toRecharge(){
      this.balanceShow = true
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
          this.getUserInfo();
          this.balanceShow = false
        }else{
           this.$notify({
            type:'danger',
            message:r.data.message
          });
          this.getUserInfo();
        }
      })
      // 实现充值逻辑
    },
    // 取消弹框
    toClose(){
      // 余额置空
      this.balance = ''
    },
  },
  computed: {
    // 获取用户信息对象
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style scoped>
/* 头部区域样式 */
.mine .bg {
  height: 310px;
  /*background: linear-gradient(rgba(251, 0, 255, 0.629), rgb(44, 44, 251));
  */
  background: url(../../assets/bg.jpg);
  opacity: 0.5;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
}
/* 用户区域样式 */
.mine .user {
  width: 80%;
  height: 170px;
  background: url(../../assets/bg.jpg);
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1.0;
  box-shadow: 0 0 10px #ccc;
  border-radius: 8px;
  padding: 0 1em;
}
/* 用户头像样式 */
.user .photo {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  opacity: 1.0;
  transform: translate(-50%, -50%);
}
/* 用户头像图片样式 */
.user .photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 1.0;
}
/* 用户用户名样式 */
.user .name {
  width: 50%;
  margin: 0 auto;
  margin-top: 3.5em;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
}
/*  */
.user .flex {
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
}
.user .flex .flex_item {
  width: 24%;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.user .flex .flex_item p:first-child {
  margin-top: 15px;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.8;
}
.user .flex .flex_item p:last-child {
  font-size: 22px;
  margin-top: -10px;
  color: #ea591d;
}
/* cell样式 */
.mine .cellArea{
  margin: 10px auto;
  /* height: 300px; */
  box-shadow: 4px 4px 4px 0 rgba(223, 132, 97, 0.2);
  transition: 0.3s;
  width: 95%;
  border-radius: 5px;
}
/* 标题文字大小 */
.van-cell .spanTitle,
.van-cell img {
  font-size: 16px;
  margin-left: 10px;
  float: left;
}
/* 内容文字大小 */
.van-cell .van-cell__value {
  font-size: 14px;
  color: #636363;
}
/* 退出按钮 */
.logout_btn {
  width: 53%;
  height: 40px;
  background-image: linear-gradient(to right,#ea591d, #ee0a24);
  text-align: center;
  color: #fff;
  border-radius: 22px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 2em;
  cursor: pointer;
}
.van-btn{
  margin-top: 17px;
  border: none;
  background-image: linear-gradient(to right, #ea591d, #ee0a24);
}
</style>