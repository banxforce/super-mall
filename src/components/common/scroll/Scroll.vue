<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
import PullUp from "@better-scroll/pull-up";

BScroll.use(PullUp)
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      bs: null
    }
  },
  mounted() {
    // 默认情况下BScroll是不可以实时的监听滚动位置;probe:侦测
    // 0,1都是不侦测实时的位置
    // 2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测．
    // 3：只要是滚动，都侦测。
    // 会按 document.querySelector('.wrapper') 进行查找
    // 创建BScroll对象
    this.bs = new BScroll('.wrapper', {
      click: true, // 让视图内的点击事件生效
      probeType: this.probeType,
      pullUpLoad: true  // false会报错:找不到pullingUp事件
    })

    // 监听滚动事件
    this.bs.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    // 监听上拉事件
    this.bs.on("pullingUp", () => {
      this.$emit('pullingUp')
      // 完成，会刷新操作
      this.bs.finishPullUp()
    })
  },
  methods:{
    // 刷新BScroll实例，重新计算滚动区域高度
    refresh(){
      // 当this.bs存在时
      this.bs && this.bs.refresh()
    }
  },

}
</script>

<!-- 滚动区域，样式由父组件决定 -->
<style scoped>

</style>