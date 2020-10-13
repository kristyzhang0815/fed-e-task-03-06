<template>
  <el-menu
    router
    class="aside-menu"
    background-color="#f8f9fb"
    text-color="#303133"
    active-text-color="#40586f"
    :collapse="collapse"
    :collapse-transition="false"
  >
    <aside-sub-menu v-for="menu in menus" :menu="menu" :key="menu.id" />
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import AsideSubMenu from './AsideSubMenu.vue'

export default Vue.extend({
  name: 'AsideMenu',
  components: { AsideSubMenu },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped>
.aside-menu {
  position: relative;
  border-right: none;
}
</style>
