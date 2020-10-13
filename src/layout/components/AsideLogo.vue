<template>
  <div class="aside-logo">
    <router-link to="/">
      <img :src="Logo" alt="logo" srcset="" />
      <strong v-if="!collapse">Edu Boss</strong>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/assets/logo.png'

export default Vue.extend({
  name: 'AsideLogo',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Logo
    }
  }
})
</script>

<style lang="less" scoped>
.aside-logo {
  width: 100%;
  background: transparent;
  &:hover {
    background: #e9eef2;
  }
  a {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    img {
      width: auto;
      height: 30px;
    }
    strong {
      font-size: 20px;
      color: #495057;
      padding-left: 10px;
    }
  }
}
</style>
