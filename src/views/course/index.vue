<template>
  <div class="course">
    <el-form inline size="mini">
      <el-form-item label="课程名称">
        <el-input v-model="courseName" placeholder="课程名称" clearable />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" clearable placeholder="请选择课程状态">
          <el-option label="全部" value="" />
          <el-option label="上架" value="1" />
          <el-option label="下架" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>新建课程</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="courses" border size="mini">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="courseName" label="课程名称" align="center" />
      <el-table-column prop="price" label="价格" align="center">
        <template slot-scope="scope">
          <span>¥</span>
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sortNum" label="排序" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <i
          slot-scope="scope"
          class="status"
          :class="{
            danger: scope.row.status === 0,
            success: scope.row.status === 1,
          }"
        ></i>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="text" size="mini"
            >上架</el-button
          >
          <el-button v-if="scope.row.status === 1" type="text" size="mini"
            >下架</el-button
          >
          <el-button type="text" size="mini" @click="handleUpdate(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" size="mini">内容管理</el-button>
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
import { courseList } from '@/apis/course'

export default Vue.extend({
  name: 'Course',
  data () {
    return {
      courses: [],
      pageno: 1,
      pagesize: 10,
      total: 1,
      status: '',
      courseName: ''
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    async getCourseList () {
      const { data: res } = await courseList({
        currentPage: this.pageno,
        pageSize: this.pagesize,
        status: this.status,
        courseName: this.courseName
      })
      this.courses = res.data.records
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
      this.getCourseList()
    }
  }
})
</script>

<style lang="less" scoped>
.course {
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
