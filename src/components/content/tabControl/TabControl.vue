<template>
  <div class="tab-control">
    <div v-for="(title,index) in titles"
         :key="index"
         class="tab-control-item"
         :class="{active:curIndex === index}"
         @click="itemClick(index)">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default:['数组是空的']
    }
  },
  data(){
    return{
      curIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.curIndex = index;
      this.$emit('tabControlClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;

  position: fixed;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>