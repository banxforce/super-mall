<template>
  <div class="goods-list">
    <GoodsListItem v-for="(item,index) in list" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goodsList/GoodsListItem.vue";

export default {
  name: 'GoodsList',
  components: {GoodsListItem},
  props: {
    list: Array,
    default() {
      return [];
    }
  }
}
</script>
<!--  --><style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;

}
</style>