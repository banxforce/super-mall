<template>
  <div id="home">
    <!--  头部导航栏  -->
    <nav-bar class="home-nav"></nav-bar>
    <!--  轮播图  -->
    <home-swiper :banners="banners"/>
    <!--  推荐视图  -->
    <recommend-view :recommends="recommends"/>
    <!--  本周流行   -->
    <feature-view/>
    <!--  标签栏  -->
    <TabControl :titles="titles" @tabControlClick="tabControlClick"/>
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";

import HomeSwiper from "@/views/home/components/HomeSwiper.vue";
import RecommendView from "@/views/home/components/RecommendView.vue";
import FeatureView from "@/views/home/components/FeatureView.vue";

import {getHomeMultiData,getHomeGoods} from "@/network/home";


export default {
  name: "TabBarHome",
  components: {
    TabControl,
    FeatureView,
    RecommendView,
    NavBar,
    HomeSwiper
  },

  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      curType: 'pop'
    };
  },
  created() {
    // 发送网络请求获取数据
    this.getHomeMultiData()

    // 请求商品信息
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {

  },

  methods: {
    /**
     * 网络请求相关的方法
     */
    // 为轮播图和推荐内容数组赋值
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log(this.banners);
        // console.log(this.recommends);
      }).catch(err => {
      })
    },
    // 获取首页商品展示信息
    getHomeGoods(type){
      const pageNum = this.goods[type].page + 1
      getHomeGoods(type,pageNum)
          .then( res => {
            console.log(res);
            // ...表示将列表展开
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page++
          })
          .catch( err => {})
    },
    /**
     * 事件监听相关的方法
     */
    tabControlClick(index) {
      // console.log("111");
      switch (index) {
        case 0:
          this.curType = 'pop'
          break
        case 1:
          this.curType = 'new'
          break
        case 2:
          this.curType = 'sell'
          break
      }
    },

  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
