<template>
  <div>
    <detail-nav-bar/>
    {{ iid }}
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar.vue";
import DetailNavBar from "@/views/detail/components/DetailNavBar.vue";

export default {
  name: "Detail",
  components: {DetailNavBar, NavBar},
  props:{
    iid:String
  }
}
</script>

<style scoped>

</style>