<template>
  <div class="welcome">
    <el-calendar v-model="value" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      value: new Date()
    }
  }
})
</script>
