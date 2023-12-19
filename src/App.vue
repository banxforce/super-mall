<template>
  <div id="app">
    <router-view/>
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
