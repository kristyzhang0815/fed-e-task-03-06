<template>
  <div class="user">
    <el-form inline size="mini">
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="请输入手机号" clearable />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="users" border size="mini">
      <el-table-column prop="id" label="用户ID" align="center" />
      <el-table-column prop="portrait" label="头像" align="center">
        <el-avatar
          slot-scope="scope"
          shape="square"
          :size="32"
          :src="scope.row.portrait || defaultAvatar"
        />
      </el-table-column>
      <el-table-column prop="name" label="用户名" align="center" />
      <el-table-column prop="phone" label="手机号" align="center" />
      <el-table-column prop="createTime" label="注册时间" align="center" />
      <el-table-column prop="isDel" label="状态" align="center">
        <i
          slot-scope="scope"
          class="status"
          :class="{
            danger: scope.row.isDel,
            success: !scope.row.isDel,
          }"
        ></i>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="text" size="mini">禁用</el-button>
          <el-button type="text" size="mini">分配角色</el-button>
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
import { userList } from '@/apis/user'
import defaultAvatar from '@/assets/default-avatar.png'

export default Vue.extend({
  name: 'User',
  data () {
    return {
      users: [],
      pageno: 1,
      pagesize: 10,
      total: 1,
      phone: '',
      dates: [],
      defaultAvatar
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await userList({
        currentPage: this.pageno,
        pageSize: this.pagesize,
        phone: this.phone
      })
      this.users = res.data.records
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
      this.getUserList()
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  .el-table {
    .status {
      display: inline-block;
      cursor: pointer;
      width: 0.875rem;
      height: 0.875rem;
      vertical-align: middle;
      border-radius: 50%;
      background: #ebeef4;
      &.success {
        background: #51cf66;
      }
      &.danger {
        background: #ff6b6b;
      }
    }
  }
}
</style>
