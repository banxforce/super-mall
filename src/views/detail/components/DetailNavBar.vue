<script>
import NavBar from "@/components/common/nav-bar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {NavBar},
  data: () => ({
    titles: ['商品', '参数', '评论', '推荐'],
    curIdx: 0,
  }),
  methods: {
    itemClick(index) {
      // 更新当前活跃的title
      this.curIdx = index
    },
    backClick(){
      this.$router.push("/home")
    }
  }
}
</script>


<template>
  <div>
    <nav-bar class="navBar">
      <!--   头部导航左侧   -->
      <template v-slot:left>
        <div id="back" @click="backClick">
          <img src="@/assets/img/common/back.svg"/></div>
      </template>
      <!--   头部导航中间   -->
      <template v-slot:center>
        <div class="title">
          <div class="title-item"
               :class="{active:index===curIdx}"
               v-for="(title, index) in titles"
               @click="itemClick(index)">
            {{ title }}
          </div>
        </div>
      </template>

    </nav-bar>
  </div>
</template>


<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
.back img{
  margin-top: 12px;

}
</style>