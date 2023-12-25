<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoaded">
        </a>
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
  name: "HomeSwiper",
  data:() =>({
    isLoaded:false
  }),
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type:Array,
      default:["数组是空的哦"]
    }
  },
  methods:{
    imgLoaded(){
      if(!this.isLoaded){
        this.$emit('swiperImgLoaded')
        this.isLoaded = true
      }
    }
  }
}

</script>