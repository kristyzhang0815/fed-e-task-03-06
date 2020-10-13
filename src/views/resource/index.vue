<template>
  <div class="resource">
    <el-form inline size="mini">
      <el-form-item label="资源名称">
        <el-input v-model="name" placeholder="资源名称" clearable />
      </el-form-item>
      <el-form-item label="资源路径">
        <el-input v-model="url" placeholder="资源路径" clearable />
      </el-form-item>
      <el-form-item label="资源分类">
        <el-select v-model="categoryId" clearable placeholder="请选择资源分类">
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>资源分类</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="resources" border size="mini">
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="资源名称" align="center" />
      <el-table-column prop="url" label="资源路径" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="createdTime" label="添加时间" align="center" />
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
import { resourceList, allCategory } from '@/apis/resource'

export default Vue.extend({
  name: 'Resource',
  data () {
    return {
      resources: [],
      categories: [],
      pageno: 1,
      pagesize: 10,
      total: 1,
      categoryId: '',
      name: '',
      url: ''
    }
  },
  created () {
    this.getResourceList()
    this.getCategoryList()
  },
  methods: {
    async getResourceList () {
      const { data: res } = await resourceList({
        current: this.pageno,
        size: this.pagesize,
        categoryId: this.categoryId,
        name: this.name,
        url: this.url
      })
      this.resources = res.data.records
      this.total = res.data.total
    },
    async getCategoryList () {
      const { data: res } = await allCategory()
      this.categories = res.data
    },
    handleUpdate (id: string) {
      console.log(id)
    },
    handleDelete (id: string) {
      console.log(id)
    },
    handleCurrentChange (pageno: number) {
      this.pageno = pageno
      this.getResourceList()
    }
  }
})
</script>
