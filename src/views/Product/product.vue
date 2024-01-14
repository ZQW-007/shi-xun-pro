<template>
  <div class="product">
    <div class="header">
      <!-- 导航 -->
      <van-nav-bar
        title="菜品"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
    <div class="container">
      <!-- 菜品内容：分类和具体菜品 -->
      <div class="left">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item 
            v-for="item in list" 
            :key="item.id"
            :title="item.name" />
        </van-sidebar>
      </div>
      <div class="right">
        <!-- 分类对应的具体菜品 -->
        <van-card
          v-for="item in products"
          :key="item.id"
          :price="item.price.toFixed(2)"
          :title="item.name"
          :thumb="item.photo"
        >
          <template #desc>
            <!-- 描述信息最多显示一行，超出部分省略 -->
            <div class="van-ellipsis">
              {{ item.description }}
            </div>
          </template>
          <template #num>
            <div>
              <van-stepper v-model="item.num" @change="changeShopCart(item)" default-value="0" min="0"/>
            </div>
          </template>
        </van-card>
      </div>

      <!-- 总价格和去下单 -->
      <div class="bottom">
        <div class="total" @click="showOverlay">￥ {{ total.toFixed(2) }}</div>
        <div class="btn" @click="toOrder">去下单</div>
      </div>

      <!-- 遮罩层:显示购物车数据 -->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <!-- 清空购物车 -->
            <div class="clear" @click="clear">
              <span>清空购物车</span>
              <van-icon name="delete-o" />
            </div>
            <!-- 购物车菜品列表 -->
            <van-card
              v-for="value of orderLines.values()"
              :key="value.id"
              :price="value.price.toFixed(2)"
              :title="value.name"
              :thumb="value.photo"
            >
              <template #footer>
                <van-icon name="clear" @click="delPro(value)" color="#bbb" size="1rem"/>
              </template>
              <template #desc>
                <!-- 描述信息最多显示一行，超出部分省略 -->
                <div class="van-ellipsis">
                  {{ value.description }}
                </div>
              </template>
              <template #num>
                <div>
                  <van-stepper v-model="value.num" @change="changeShopCart(value)" min="1"/>
                </div>
              </template>
            </van-card>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { get } from '@/http/axios.js'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data(){
    return {
      // 侧边导航的当前索引
      activeKey: this.$route.query.index,
      // 菜品数组：包含菜品分类和具体的菜品
      list: [],
      // 具体菜品数组
      products: [],
      // 是否显示遮罩层
      show: false,

    }
  },
  computed: {
    ...mapState('shopcart', ['orderLines']),
    ...mapGetters('shopcart', ['total'])
  },
  watch: {
    // 侦听total，价格为0，关闭遮罩层
    total(newValue){
      if(newValue==0){
        this.show = false
      }
    }
  },
  methods: {
    ...mapMutations('shopcart',['addShopcart','clearShopcart']),

    // 返回
    onClickLeft(){
      this.$router.go(-1)
    },
    // 根据orderLines显示菜品数量
    changeProducts(){
      // 将购物车的菜品数量反应到步进器
      this.orderLines.forEach((value,key)=>{
        // console.log(value,key)
        this.list.forEach(item=>{
          if(item.id == value.productCategoryId){
            item.products.forEach(product=>{
              if(product.id == key){
                product.num = value.num
              }
            })
          }
        })
      })
      this.products = this.list[this.activeKey].products
    },
    // 获取商品树
    async getAll(){
      let { data } = await get('/app/product/queryCategoryWithProducts')
      this.list = data.data
      this.changeProducts()
      // console.log(this.list)
      // console.log(this.products)
      // console.log(data.data)
    },
    // 侧边导航栏改变事件的方法
    onChange(index){
      this.products = this.list[index].products
    },
    // 步进器改变事件的方法
    changeShopCart(item){
      item.productId = item.id
      this.addShopcart(item)
      this.getAll()
      // console.log(this.orderLines)
    },
    // 清空购物车
    clear(){
      this.clearShopcart()
      this.show = false
      this.getAll()
      Toast('购物车已清空！')
    },
    delPro(item){
      item.productId = item.id
      item.num = 0
      this.addShopcart(item)
      this.getAll()
    },
    // 点击价格显示遮罩层
    showOverlay(){
      if(this.total !== 0){
        // 总价格不等于0的时候，显示遮罩层
        this.show = true
      }
    },
    // 跳转到下单页面
    toOrder(){
      this.$router.push({
        path: '/orderConfirm'
      })
    }
  },
  created(){
    this.getAll()
    // console.log(this.$route)
  }
}
</script>
<style lang="less" scoped>
.product{
  .header{
    .van-nav-bar{
      background-color: #ee0a24;
      ::v-deep .van-icon{
        color: #fff;
      }
      ::v-deep .van-nav-bar__title{
        color: #fff;
      }
    }
  }
  // 内容
  .container{
    width: 100vw;
    // height: 100vh;
    // overflow-y: scroll;
    background-color: #f2f3f5;
    padding-top: 46px;
    display: flex;
    .left{
      position: fixed;
    }
    .right{
      flex: 1;
      height: ~"calc(100vh - 106px)";
      overflow-y: scroll;
      margin-left: 80px;
      width: ~"calc(100vw - 80px)";
      // background-color: #f2f3f5;
      .van-card__title{
        font-size: 14px;
        line-height: 25px;
        font-weight: 600;
      }
    }
    .bottom{
      @height: 40px;
      position: fixed;
      bottom: 0;
      line-height: @height;
      height: @height;
      margin: 10px;
      width: ~"calc(100vw - 20px)";
      color: #fff;
      display: flex;
      z-index: 10;
      .total{
        padding-left: 20px;
        font-size: 20px;
        flex: 1;
        background-color: black;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      .btn{
        text-align: center;
        font-size: 18px;
        width: 80px;
        background-color: #ee0a24;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
    .wrapper {
      height: 100%;
      display: flex;
      align-items: flex-end;
    }

    .block {
      // padding-top: 10px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      width: 100vw;
      max-height: 60vh;
      overflow-y: scroll;
      background-color: #fff;
      .clear{
        padding: 5px 0;
        font-size: 14px;
        color: #c0c0c0;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: sticky;
        top: 0;
        z-index: 10;
        width: 100%;
        background-color: #fff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }
      // .van-card:nth-child(2){
      //   margin-top: 30px;
      // }
      .van-card:last-child{
        margin-bottom: 60px;
      }
      .van-card__footer{
        float: right;
        margin-top: -100px;
      }
    }
  }
}
</style>