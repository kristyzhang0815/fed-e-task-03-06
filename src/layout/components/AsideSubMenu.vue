<template>
  <div :is="comname" :index="menu.href">
    <template v-if="hasChildren">
      <template slot="title">
        <i :class="`el-icon-${menu.icon}`"></i>
        <span slot="title">{{ menu.name }}</span>
      </template>
      <el-menu-item-group>
        <aside-sub-menu
          v-for="item in menu.subMenuList"
          :menu="item"
          :key="item.id"
        />
      </el-menu-item-group>
    </template>
    <template v-else>
      <i :class="`el-icon-${menu.icon}`"></i>
      <span slot="title">{{ menu.name }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AsideSubMenu',
  props: {
    menu: {
      type: Object
    }
  },
  computed: {
    hasChildren: {
      get (): boolean {
        return this.menu.subMenuList.length > 0
      }
    },
    comname: {
      get (): string {
        return this.hasChildren ? 'el-submenu' : 'el-menu-item'
      }
    }
  }
})
</script>
