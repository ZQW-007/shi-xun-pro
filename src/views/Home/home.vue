<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="title">
      杰普点餐
    </div>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in swiperData" :key="item.id">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 菜单分类区域 -->
    <div class="category">
      <!-- 测试 -->
      <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="value in totalPage" :key="value">
          <van-grid icon-size="30" :border="false" :column-num="5">
            <van-grid-item
              v-for="(item) in categoryData.list"
              :key="item.id"
              :icon="item.icon"
              :text="item.name"
              @click="toProductPage(item.id,item.num)"
            />
          </van-grid>
        </van-swipe-item>
      </van-swipe>
      <!-- <van-grid :column-num="5" :border="false">
        <van-grid-item v-for="item in categoryData.list" :key="item.id" :icon="item.icon" :text="item.name" />
      </van-grid> -->
    </div>
    <!-- 产品展示样式 -->
    <div class="product">
      <div class="productDetail" v-for="item in homeProductData" :key="item.id" @click="getProductDetail(item.id)">
        <!-- 图片 -->
        <div class="photo">
          <img :src="item.photo" alt="">
        </div>
        <!-- 名称 -->
        <div class="name">{{item.name}}</div>
        <!-- 描述 -->
        <!-- <div class="desc">{{item.description}}</div> -->
      </div>
    </div>
    <!-- 产品详情展示 -->
    <van-action-sheet v-model="proDetailShow" title="菜品详情">
      <div class="content">
        <!-- 图片 -->
        <div class="proImg">
          <img :src="productDetailData.photo" alt="">
        </div>
        <!-- 菜品名称 -->
        <div class="proTitle">{{productDetailData.name}}</div>
        <!-- 价格 -->
        <div class="price">
          ￥{{productDetailData.price}}/{{productDetailData.unit}}
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 详情描述 -->
        <div class="desc">
          <div style="font-size:18px;font-weight:bold;">详情</div>
          {{productDetailData.description}}
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
// 引入辅助函数
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      // 轮播默认
      totalPage: 1,
      // 商品详情展示
      proDetailShow: false
    };
  },
  created() {
    // 获取轮播图数据
    this.getSwiperData();
    // 获取产品栏目数据
    this.getCategoryDataObj();
    // 获取首页产品数据
    this.getHomeProductData()
  },
  computed: {
    // 轮播图数据
    ...mapState("home", ["swiperData"]),
    // 产品分类数据
    ...mapState("category", ["categoryData"]),
    // 首页产品数据
    ...mapState("product", ["homeProductData","productDetailData"]),
  },
  methods: {
    // 获取轮播图数据
    ...mapActions("home", ["getSwiperData"]),
    // 获取产品分类数据
    ...mapActions("category", ["getCategoryData"]),
    // 获取首页产品数据
    ...mapActions('product',['getHomeProductData','getProductDetailById']),
    getCategoryDataObj() {
      // 参数
      let params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getCategoryData(params).then((r) => {
        this.totalPage = Math.ceil(this.categoryData.total / this.pageSize);
      });
    },
    // 监听轮播图index变化 动态获取每一页的轮播图数据
    // 滚动菜单测试
    onChange(index) {
      this.page = index + 1;
      // 重新获取数据
      this.getCategoryDataObj();
    },
    // 跳转到产品页面
    toProductPage(categoryId, num){
      let activeKey = num - 1;
      // 页面跳转
      this.$router.push({ path: 'product', query: { productCategoryId: categoryId, activeKey }})
    },
    // 首页获取商品详情
    getProductDetail(id){
      // 获取商品详情信息
      this.getProductDetailById({id})
      // 开启商品详情弹出框
      this.proDetailShow = true
    }
  },
};
</script>

<style scoped>

/* 轮播样式 */
.home .title {
  height: 130px;
  background-image: linear-gradient(to right, #FF5F6D, #FFC371);
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  font-size: 29px;
  font-family: 'webfont';
  color: white;
  text-align: center;
  padding-top: 7px;
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
.home .swipe {
  width: 90%;
  height: 160px;
  position: absolute;
  top: 136px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 #aaaaaa;
  border-radius: 8px;
}
.home .swipe img {
  height: 160px;
  width: 100%;
  border-radius: 8px;
}
/* 菜单区域 */
.category {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
  background-color: white;
  transition: 0.3s;
  width: 98%;
  border-radius: 5px;
  margin: 100px 0 0 0;
  height: 90px;
}
/* 轮播图图片样式 */
.swiper img {
  width: 100%;
  height: 240px;
}
/* 产品区域整体样式 */
.product{
  padding-bottom: 50px;
  width: 100%;
  display:flex;
  flex-wrap: wrap;
}
/* 产品卡片样式 */
.product .productDetail {
  width: calc(calc(100% / 2) - 30px);
  margin:15px;
  height:50px;
  box-sizing: border-box;
  box-shadow: 0 0 5px 0 rgba(234, 218, 255, 1);
  background-color: #FFFFFF;
  border-radius: 5px;
  justify-content: space-around;
  height: 160px;
  text-align: center;
}
.product .productDetail:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
/* 产品内容样式 */
/* 产品图片 */
.product .productDetail .photo{
  margin: 20px 0 0 0;
}
.product .productDetail .photo img{
  width: 140px;
  height: 80px;
  overflow: hidden;
}
/* 产品名称 */
.product .productDetail .name{
  font-family: 'webfont';
  font-weight: 500;
  font-size: 20px;
  color: #333333;
}
/* 产品描述 */
.product .productDetail .desc{
  color: #666666;
}
/* 商品详情展示区域 */
.content {
  padding: 16px 16px 160px;
  text-align: center;
}
/* 图片样式 */
.content .proImg img{
  height: 150px;
}
/* 菜品名称 */
.content .proTitle{
  font-size: 18px;
  font-weight: bold;
}
/* 菜品价格 */
.content .price{
  color: red;
}
/* 分割线 */
.content .line{
  padding: 0 20px 0;
  margin: 20px 0;
  border: 1px solid;
}
</style>