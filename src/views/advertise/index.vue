<template>
  <div class="advertise">
    <div class="options-bar">
      <el-button size="mini">添加广告</el-button>
    </div>
    <el-table :data="advertises" border size="mini">
      <el-table-column prop="id" label="id" align="center" />
      <el-table-column prop="name" label="广告名称" align="center" />
      <el-table-column prop="spaceId" label="广告位置" align="center" />
      <el-table-column prop="img" label="广告图片" align="center">
        <el-avatar
          slot-scope="scope"
          shape="square"
          :size="120"
          :src="scope.row.img"
        />
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          <p>开始时间：{{ scope.row.startTimeFormatString }}</p>
          <p>到期时间：{{ scope.row.endTimeFormatString }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row.id)"
            >编辑</el-button
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
import { advertiseList } from '@/apis/advertise'

export default Vue.extend({
  name: 'Advertise',
  data () {
    return {
      advertises: [],
      pageno: 1,
      pagesize: 10,
      total: 1
    }
  },
  created () {
    this.getAdvertiseList()
  },
  methods: {
    async getAdvertiseList () {
      const { data: res } = await advertiseList({
        pageNum: this.pageno,
        pageSize: this.pagesize
      })
      this.advertises = res.content
      this.pagesize = this.advertises.length
      this.total = this.advertises.length
    },
    handleUpdate (id: string) {
      console.log(id)
    },
    handleDelete (id: string) {
      console.log(id)
    },
    handleCurrentChange (pageno: number) {
      this.pageno = pageno
      this.getAdvertiseList()
    }
  }
})
</script>

<style lang="less" scoped>
.advertise {
  .options-bar {
    margin-bottom: 20px;
  }
}
</style>
