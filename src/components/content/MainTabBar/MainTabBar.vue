<template>
  <tab-bar>
    <template v-slot:default>
      <tab-bar-item link="/home" active-color="red">
        <template v-slot:item-icon>
          <img src="../../../assets/img/tabbar/home.svg" alt=""/>
        </template>
        <template v-slot:item-icon-active>
          <img src="../../../assets/img/tabbar/home_active.svg" alt=""/>
        </template>
        <template v-slot:item-text> <div>首页</div> </template>
      </tab-bar-item>

      <tab-bar-item link="/category">
        <template v-slot:item-icon>
          <img src="../../../assets/img/tabbar/category.svg" alt=""/>
        </template>
        <template v-slot:item-icon-active>
          <img src="../../../assets/img/tabbar/category_active.svg" alt=""/>
        </template>
        <template v-slot:item-text> <div>分类</div> </template>
      </tab-bar-item>

      <tab-bar-item link="/cart">
        <template v-slot:item-icon>
          <img src="../../../assets/img/tabbar/shopcart.svg" alt=""/>
        </template>
        <template v-slot:item-icon-active>
          <img src="../../../assets/img/tabbar/shopcart_active.svg" alt=""/>
        </template>
        <template v-slot:item-text> <div>购物车</div> </template>
      </tab-bar-item>

      <tab-bar-item link="/profile">
        <template v-slot:item-icon>
          <img src="../../../assets/img/tabbar/profile.svg" alt=""/>
        </template>
        <template v-slot:item-icon-active>
          <img src="../../../assets/img/tabbar/profile_active.svg" alt=""/>
        </template>
        <template v-slot:item-text> <div>我的</div> </template>
      </tab-bar-item>
    </template>
  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tab-bar/TabBar.vue";
import TabBarItem from "@/components/common/tab-bar/TabBarItem.vue";

export default {
  components:{
    TabBarItem,
    TabBar
  }
}
</script>

<style scoped>

</style>