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
        <van-sidebar v-model="activeKey">
          <van-sidebar-item 
            v-for="item in list" 
            :key="item.id"
            :title="item.name" />
        </van-sidebar>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { get } from '@/http/axios.js'
export default {
  data(){
    return {
      // 侧边导航的当前索引
      activeKey: 0,
      // 菜品数组：包含菜品分类和具体的菜品
      list: [],
    }
  },
  methods: {
    // 返回
    onClickLeft(){
      this.$router.go(-1)
    },
    // 获取商品树
    async getAll(){
      let { data } = await get('/app/product/queryCategoryWithProducts')
      this.list = data.data
      // console.log(data.data)
    }
  },
  created(){
    this.getAll()
  }
}
</script>
<style lang="less" scoped>
.product{
  .header{
    .van-nav-bar{
      background-color: #ff0073;
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
    padding-top: 46px;
  }
}
</style>