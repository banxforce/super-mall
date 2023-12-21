<template>
  <div id="home">
    <!--  头部导航栏  -->
    <nav-bar class="home-nav"></nav-bar>

    <!--  滚动区域。原生滚动在移动端会出现卡顿  -->
    <scroll class="content"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!--  轮播图  -->
      <home-swiper :banners="banners"/>
      <!--  推荐视图  -->
      <recommend-view :recommends="recommends"/>
      <!--  本周流行   -->
      <feature-view/>
      <!--  标签栏  -->
      <TabControl class="tab-control" :titles="titles" @tabControlClick="tabControlClick"/>
      <!--  商品列表  -->
      <goods-list :list="showGoods"/>
    </scroll>
    <!--  返回顶部图标    -->
    <back-top @click.native="backTop"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";

import HomeSwiper from "@/views/home/components/HomeSwiper.vue";
import RecommendView from "@/views/home/components/RecommendView.vue";
import FeatureView from "@/views/home/components/FeatureView.vue";

import {getHomeMultiData, getHomeGoods} from "@/network/home";
import GoodsList from "@/components/content/goodsList/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";
export default {
  name: "TabBarHome",
  components: {
    GoodsList,
    TabControl,
    FeatureView,
    RecommendView,
    NavBar,
    HomeSwiper,
    Scroll,
    BackTop
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
  computed: {
    showGoods() {
      return this.goods[this.curType].list
    }
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
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }).catch(err => {
      })
    },
    // 获取首页商品展示信息
    getHomeGoods(type) {
      const pageNum = this.goods[type].page + 1
      getHomeGoods(type, pageNum)
          // 将res解构，直接拿到data
          .then(({data}) => {
            // console.log(data);
            // ...表示将列表展开
            this.goods[type].list.push(...data.list)
            this.goods[type].page++
          })
          .catch(err => {
          })
    },
    /**
     * 事件监听相关的方法
     */
    tabControlClick(index) {
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
    // 滚动监听事件调用
    contentScroll(position){
      // console.log(position);
    },
    // 上拉加载事件调用
    loadMore(){
      console.log("加载更多");
    },
    // 回到顶部 组件点击事件调用
    backTop() {
      /* ref 作用在普通元素上，用this.$ref.name 获取dom元素；
       * ref 作用子组件上，用this.$ref.name 获取到组件实例，可以使用组件所有方法。*/
      // 这个组件内引入了 BScroll框架并实例化后挂载在了Vue上，所以 隐式的把自己暴露给了$refs
      this.$refs.bs.scrollTo(0,0)
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

/*为滚动区域设置绝对区域*/
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
