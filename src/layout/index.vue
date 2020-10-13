<template>
  <el-container class="layout">
    <el-aside :width="collapse ? '64px' : '200px'">
      <aside-logo :collapse="collapse" />
      <aside-menu :collapse="collapse" :menus="menus" />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <div class="options">
          <i
            class="hamburger"
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="collapse = !collapse"
          ></i>
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              shape="square"
              :size="32"
              :src="userinfo.portrait || defaultAvatar"
            />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ userinfo.userName }}</el-dropdown-item>
            <el-dropdown-item divided @click.native="handleLogout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <el-card>
          <div class="app-container">
            <el-scrollbar style="height: 100%">
              <router-view />
            </el-scrollbar>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AsideLogo from './components/AsideLogo.vue'
import AsideMenu from './components/AsideMenu.vue'
import defaultAvatar from '@/assets/default-avatar.png'
import { mine } from '@/apis/user'
import { Menu } from '@/apis/menu'
import { permitDetail } from '@/apis/permit'

export default Vue.extend({
  name: 'Layout',
  components: { AsideLogo, AsideMenu },
  data () {
    return {
      defaultAvatar,
      userinfo: {
        portrait: '',
        userName: ''
      },
      menus: [] as Array<Menu>
    }
  },
  computed: {
    collapse: {
      get () {
        return this.$store.state.collapse
      },
      set (val) {
        this.$store.commit('setCollapse', val)
      }
    },
    title: {
      get () {
        return this.$route.meta.title
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getPermitInfo()
  },
  methods: {
    async getUserInfo () {
      const { data: res } = await mine()
      this.userinfo = res.content
    },
    async getPermitInfo () {
      const { data: res } = await permitDetail()
      const filter = (item: Menu) => {
        if (item.shown) {
          item.subMenuList = (item.subMenuList || []).filter(filter)
        }
        return item.shown
      }
      this.menus = (res.content.menuList as Array<Menu>).filter(filter)
    },
    handleLogout (): void {
      this.$confirm('是否确认退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUser', {})
          this.$router.push('/login')
        })
        .catch(() => {
          // TODO
        })
    }
  }
})
</script>

<style lang="less" scoped>
.layout {
  .el-aside {
    background: #f8f9fb;
    min-height: 100vh;
  }
  .el-header {
    background: #f8f9fb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
    user-select: none;
    .hamburger {
      padding: 15px;
      font-size: 20px;
      line-height: 20px;
      color: #40586f;
      cursor: pointer;
      &:hover {
        background: #e9eef2;
      }
    }
    .el-breadcrumb {
      display: inline-block;
      margin-left: 10px;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
  .el-main {
    .app-container {
      height: calc(100vh - 132px);
    }
  }
}
</style>
