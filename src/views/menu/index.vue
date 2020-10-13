<template>
  <div class="menu">
    <div class="options-bar">
      <el-button size="mini">添加菜单</el-button>
    </div>
    <el-table :data="menus" border size="mini">
      <el-table-column label="编号" type="index" align="center" />
      <el-table-column prop="name" label="菜单名称" align="center" />
      <el-table-column prop="level" label="菜单级数" align="center" />
      <el-table-column prop="icon" label="前端图标" align="center">
        <i slot-scope="scope" :class="`el-icon-${scope.row.icon}`"></i>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handleDelete(scope.row.id)"
            style="color: #f56c6c"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
      :page-size="pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
      style="margin-top: 20px; text-align: right"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { allMenu } from '@/apis/menu'

export default Vue.extend({
  name: 'Menu',
  data () {
    return {
      menus: [],
      pageno: 1,
      pagesize: 10,
      total: 1
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      const { data: res } = await allMenu()
      this.menus = res.data
      this.pagesize = this.menus.length
      this.total = this.menus.length
    },
    handleUpdate (id: string) {
      console.log(id)
    },
    handleDelete (id: string) {
      console.log(id)
    },
    handleCurrentChange (pageno: number) {
      this.pageno = pageno
      this.getMenuList()
    }
  }
})
</script>

<style lang="less" scoped>
.menu {
  .options-bar {
    margin-bottom: 20px;
  }
}
</style>
