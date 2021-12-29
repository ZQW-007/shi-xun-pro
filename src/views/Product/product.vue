<template>
  <div class="product">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="菜品分类"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 根据栏目查询对应的产品信息 -->
    <div class="productContent">
      <div class="categorySideBar">
        <van-sidebar v-model="activeKey" @change="onChange" :lock-scroll="false">
          <van-sidebar-item v-for="(item,index) in categoryData.list" :key="index" :title="item.name" />
        </van-sidebar>
      </div>
      <div class="productList">
        <van-card
          v-for="(item,index) in productData.list"
          :key="index"
          :price="item.price + '.00'"
          :desc="item.description"
          :title="item.name"
          :thumb="item.photo"
        >
          <template #footer>
            <van-stepper default-value="0" v-model="item.number" :min="0" @change="numChangeHandler(item)"/>
          </template>
        </van-card>
        <div style="height:50px"></div>
        <!-- 总价计算 -->
        <van-submit-bar button-color="#8430FF" :price="total * 100" button-text="提交订单" @submit="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapMutations,mapState,mapGetters} from 'vuex'
export default {
  data() {
    return {
      // 侧边导航默认点击
      activeKey: '0',
      // 首页跳转后传递的栏目id
      categoryId: '',
    }
  },
  created() {
    // 当前被点击
    this.activeKey = this.$route.query.activeKey
    this.categoryId = this.$route.query.productCategoryId
    // 获取产品分类数据
    this.getCategoryInfo()
    // 根据栏目id获取产品数据
    this.getProductData()
  },
  computed:{
    // 产品分类辅助函数
    ...mapState('category',['categoryData']),
    // 获取产品数据
    ...mapState('product',['productData']),
    // 获取购物车总价
    ...mapGetters('shopcart',['total'])
  },
  methods: {
    // 产品分类辅助函数
    ...mapActions('category',['getCategoryData']),
    // 根据分类id获取产品数据
    ...mapActions('product',['getProductDataByProductCategoryId']),
    // 添加购物车
    ...mapMutations('shopcart',['addShopcart','clearShopcart']),
    // 获取侧边栏产品分类数据
    getCategoryInfo(){
      // 参数
      let params = {
        page: 1,
        pageSize: 1000
      }
      // 调用获取产品分类
      this.getCategoryData(params)
    },
    // 根据栏目id获取产品数据
    getProductData(){
      // 参数
      let params = {
        page: 1,
        pageSize: 100,
        productCategoryId: this.categoryId
      }
      // 根据栏目id获取产品数据
      this.getProductDataByProductCategoryId(params)
    },
    // 侧边栏切换监听
    onChange(index) {
      // 点击侧边栏时更新id
      this.categoryId = this.categoryData.list[index].id
      this.getProductData()
    },
    // 监听步进器变化
    numChangeHandler(item){
      let orderLine = {
        productId:item.id,
        name:item.name,
        price:item.price,
        num:item.number
      }
      // console.log(orderLine);
      this.addShopcart(orderLine)
    },
    // 提交订单
    onSubmit(){
      // 跳转到订单提交页面
      this.$router.push('/manager/orderConfirm')
    },
    // 返回上一页
    onClickLeft(){
      this.$store.getters.total = 0
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
/* 产品整体样式 */
.productContent{
  display: flex;
  height: calc(100vh - 100px);
}
/* 左侧侧边栏区域 */
.productContent .categorySideBar{
  width: 150px;
  resize: horizontal;
  overflow: auto; /*必须设置overflow属性，才能使resize生效*/
}
/* 右侧产品列表区域 */
.productContent .productList{
  flex: 1;
  overflow-y: auto;
  position: relative;
}
/* 侧边导航样式 */
.van-sidebar {
  width: 150px;
  overflow-y: auto;
}
/* 导航栏内容区样式 */
.van-sidebar-item{
  font-size: 16px;
  text-align: center;
  height: 3.5rem;
}
/* 选中颜色 */
.van-sidebar-item--select::before{
  background-color: #8430FF;
}
/* 顶部总价计算 */
.van-submit-bar__bar{
  width: 95%;
  position: absolute;
  bottom: 50px;
  background-color: white;
}
</style>