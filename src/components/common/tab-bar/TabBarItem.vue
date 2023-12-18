<template>
  <div id="tab-bar-item" @click="toLink">
    <div v-if="isActive">
      <slot name="item-icon-active"/>
    </div>
    <div v-else>
      <slot name="item-icon"/>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",

  props: {
    link: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },

  data() {
    return {};
  },

  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) === 0;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },

  mounted() {
  },

  methods: {
    toLink() {
      this.$router.push(this.link).catch((err) => {
      });
    },
  },
};
</script>

<style scoped>
#tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

#tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
