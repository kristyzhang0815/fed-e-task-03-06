<template>
  <div class="role">
    <el-form inline size="mini">
      <el-form-item label="输入搜索">
        <el-input v-model="keyword" placeholder="角色名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="roles" border size="mini">
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="角色名称" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="createdTime" label="添加时间" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini">分配菜单</el-button>
          <el-button type="text" size="mini">分配资源</el-button>
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
import { roleList } from '@/apis/role'

export default Vue.extend({
  name: 'Role',
  data () {
    return {
      roles: [],
      pageno: 1,
      pagesize: 10,
      total: 1,
      keyword: ''
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { data: res } = await roleList({
        current: this.pageno,
        size: this.pagesize,
        name: this.keyword
      })
      this.roles = res.data.records
      this.total = res.data.total
    },
    handleUpdate (id: string) {
      console.log(id)
    },
    handleDelete (id: string) {
      console.log(id)
    },
    handleCurrentChange (pageno: number) {
      this.pageno = pageno
      this.getRoleList()
    }
  }
})
</script>
