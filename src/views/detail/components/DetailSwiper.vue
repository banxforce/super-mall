<script>
import Swiper from "@/components/common/swiper/Swiper.vue"
import SwiperItem from "@/components/common/swiper/SwiperItem.vue"

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      default: [],
      type: Array
    }
  },
  components: {Swiper, SwiperItem},
}
</script>

<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" >
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>