<template>
  <div class="advertise-space">
    <div class="options-bar">
      <el-button size="mini">添加广告位</el-button>
    </div>
    <el-table :data="spaces" border size="mini">
      <el-table-column prop="spaceKey" label="spaceKey" align="center" />
      <el-table-column prop="name" label="广告位名称" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="updateTime" label="更新时间" align="center" />
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
import { allAdvertiseSpace } from '@/apis/advertise-space'

export default Vue.extend({
  name: 'AdvertiseSpace',
  data () {
    return {
      spaces: [],
      pageno: 1,
      pagesize: 10,
      total: 1
    }
  },
  created () {
    this.getSpaceList()
  },
  methods: {
    async getSpaceList () {
      const { data: res } = await allAdvertiseSpace()
      this.spaces = res.content
      this.pagesize = this.spaces.length
      this.total = this.spaces.length
    },
    handleUpdate (id: string) {
      console.log(id)
    },
    handleDelete (id: string) {
      console.log(id)
    },
    handleCurrentChange (pageno: number) {
      this.pageno = pageno
      this.getSpaceList()
    }
  }
})
</script>

<style lang="less" scoped>
.advertise-space {
  .options-bar {
    margin-bottom: 20px;
  }
}
</style>
