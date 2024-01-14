<template>
  <div class="home">
    <div class="header">
      <!-- 搜索 -->
      <van-search show-action v-model="value" shape="round" background="linear-gradient(rgba(230, 230, 230, 0.629), rgb(44, 150, 251))" placeholder="请输入菜品名称关键字">
        <template #action>
          <div @click="onSearch" class="search">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="images">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image.url" height="180px" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="container">
      <!-- 宫格 -->
      <van-grid :column-num="3" :border="false">
        <van-grid-item to="/product" v-for="item in categorys" :key="item.id" :icon="item.icon" :text="item.name" />
      </van-grid>
    </div>
    <div class="product">
      <!-- 搜索结果 -->
      <van-card
        v-for="item in result"
        :key="item.id"
        :price="item.price.toFixed(2)"
        :desc="item.description"
        :title="item.name"
        :thumb="item.photo"
      >
        <!-- 菜品分类标签 -->
        <template #tags>
          <van-tag plain type="danger">{{ item.category.name }}</van-tag>
        </template>

        <template #num>
          <div>
            {{ item.unit }}
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
// 引入get方法
import {get} from '@/http/axios.js'

import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  data() {
    return {
      // 搜索变量
      value: '',
      // 轮播图变量
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      // 菜品分类数组
      categorys: [],
      // 搜索结果数组
      result: []
    }
  },
  watch: {
    // 侦听搜索框，值为空时清空搜索结果
    value(newValue){
      if(newValue==''){
        this.result = []
      }
    }
  },
  methods: {
    // 搜索方法
    async onSearch() {
      let param = {
        page: 1,
        pageSize: 10,
        name: this.value
      }
      let res = await get('/product/pageQuery', param)
      // console.log(res.data.data.list)
      this.result = res.data.data.list
    },
    // 获取轮播图方法
    async getImages(){
      let res = await get('/carousel/findAll')
      // console.log(res)
      this.images = res.data.data
    },
    // 获取商品树方法
    async getAll(){
      let { data } = await get('/app/product/queryCategoryWithProducts')
      // console.log(data)
      this.categorys = data.data
    }
  },
  created(){
    this.getImages()
    this.getAll()
  }
}
</script>
<style lang="less" scoped>
.home{
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    .search{
      color: #ffffff;
    }
  }
  // 轮播图
  .images{
    padding-top: 54px;
  }
  .product{
    .van-card:last-child{
      margin-bottom: 50px;
    }
  }
}
</style>