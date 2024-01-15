<template>
    <div>
        <van-sticky :offset-top="0">
      <van-nav-bar
        title="联系我们"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
        <van-cell is-link>
        <div class="spanTitle">公司地址</div>
      </van-cell>
      <van-cell is-link>
        <div class="spanTitle">联系电话</div>
      </van-cell>
      <van-cell is-link>
        <div class="spanTitle">人工客服</div>
      </van-cell>
      <van-cell is-link>
        <div class="spanTitle">软件详情</div>
      </van-cell>
    </div>
</template>
<script>
export default {
    // 返回上一级页面
    methods:{
    onClickLeft() {
        this.$router.go(-1);
    }}
}
</script>
