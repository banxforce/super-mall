<template>
  <div id="detail">
    <!--  头部导航  -->
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <div>
        <!--  轮播图  -->
        <detail-swiper :top-images="topImages"/>
        <!--  商品基本信息  -->
        <detail-base-info :goods="goods"/>
        <!--  店铺信息  -->
        <detail-shop-info :shop="shop"/>
        <!--   商品参数     -->
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar.vue";
import DetailNavBar from "@/views/detail/components/DetailNavBar.vue";
import DetailSwiper from "@/views/detail/components/DetailSwiper.vue";
import DetailBaseInfo from "@/views/detail/components/DetailBaseInfo.vue";

import {getDetailByIid, Goods, GoodsParam, Shop} from "@/network/detail";
import DetailShopInfo from "@/views/detail/components/DetailShopInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "@/views/detail/components/DetailGoodsInfo.vue";

export default {
  name: "Detail",
  components: {DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailNavBar, NavBar, DetailSwiper},
  props: {
    iid: String
  },
  data: () => ({
    topImages: [],
    goods: Goods,
    shop: Shop,
    detailInfo: {}
  }),
  mounted() {
// 根据iid获取detail信息
    getDetailByIid(this.iid)
        .then(({result}) => {
          // 封装轮播图信息
          this.topImages = result.itemInfo.topImages
          // 获取商品基本信息并封装
          this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
          // 获取商家信息
          this.shop = new Shop(result.shopInfo)
          // 保存商品的详情数据
          this.detailInfo = result.detailInfo
        })
        .catch(err => {
          console.log(err);
        })
  },
  methods:{
    imageLoad() {
      this.$refs.scroll.refresh()

    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
</style>