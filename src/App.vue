<template>
  <div id="app">
<!--  详情页每次点击需要重新创建  -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/MainTabBar/MainTabBar.vue";

export default {
  components: {
    MainTabBar
  }
}

</script>

<style>
@import "@/assets/css/base.css";
@import url("//unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css");
</style>
