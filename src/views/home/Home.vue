<template>
  <div id="home">
    <!--  头部导航栏  -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        购物街
      </template>
    </nav-bar>
    <!--  标签栏,滚动后显示  -->
    <TabControl
        class="tab-control"
        :titles="titles"
        @tabControlClick="tabControlClick"
        ref="tabControlUpper"
        v-show="showTabControlBefore"/>
    <!--  滚动区域。原生滚动在移动端会出现卡顿  -->
    <scroll class="content"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            ref="scroll">
      <!--  轮播图  -->
      <home-swiper :banners="banners" @swiperImgLoaded="swiperImgLoaded"/>
      <!--  推荐视图  -->
      <recommend-view :recommends="recommends"/>
      <!--  本周流行   -->
      <feature-view/>
      <!--  标签栏,初始显示  -->
      <TabControl
          class="tab-control"
          :titles="titles"
          @tabControlClick="tabControlClick"
          ref="tabControlBelow"/>
      <!--  商品列表  -->
      <goods-list :list="showGoods"/>
    </scroll>
    <!--  返回顶部图标    -->
    <back-top @click.native="backTop" v-show="backTopShow"/>
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
      curType: 'pop',
      backTopShow: false,
      tabControlOffsetTop:null,
      showTabControlBefore:false,
      curPosition:{
        x:0,
        y:0
      }
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

    // console.log(this.goods);
  },
  mounted() {
    // 通过定义的防抖函数，调用组件内定义的刷新方法
    const refresh = this.debounce(this.getScroll().refresh)
    // 监听事件总线上的指定事件
    this.$bus.$on('imgLoaded', () => {
      refresh()
    })
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
    /**
     * 防抖函数，setTimeout内的function会被放到事件循环末尾处理，所以即使没有delay,也不会立即执行
     * @param func 要进行处理的函数
     * @param delay 延时事件，单位ms。
     * @return function (...ars) 处理完成的函数
     */
    debounce(func, delay) {
      let timer = null
      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          // apply(方法内this的指向,参数)
          func.apply(this, args)
        }, delay)
      }
    },
    // 标签栏点击事件
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
    contentScroll(position) {
      // 当上拉时
      this.backTopShow = position.y < 0
      // 当滚动到对应位置时改变值
      this.showTabControlBefore = -position.y >= this.tabControlOffsetTop
      // 存储当前位置
      this.curPosition = position
    },
    // 上拉加载事件调用
    loadMore() {
      // 加载数据
      this.getHomeGoods(this.curType)
    },
    // 回到顶部 组件点击事件调用
    backTop() {
      this.getScroll().scrollTo(0, 0,300)
    },
    // 轮播图加载完之后获取tabController的offsetTop
    swiperImgLoaded(){
      // .$el 得到组件内的元素
      this.tabControlOffsetTop = this.$refs.tabControlBelow.$el.offsetTop;
    },
    // 获取Scroll组件
    getScroll(){
      /* ref 作用在普通元素上，用this.$ref.name 获取dom元素；
       * ref 作用子组件上，用this.$ref.name 获取到组件实例，可以使用组件所有方法。*/
      // 这个组件内引入了 BScroll框架并实例化后挂载在了Vue上，所以 隐式的把自己暴露给了$refs
      return this.$refs.scroll
    }
  },

  // 回到页面时回到离开前的位置，页面为活跃状态时,新版BScroll以及修复，不需要自己实现
  // activated() {
  //   this.getScroll().scrollTo(this.curPosition.x,this.curPosition.y,300)
  // },


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

  /* 使用浏览器原生滚动的才需要
  */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
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

.tab-control{
  position: relative;
  z-index: 9;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
