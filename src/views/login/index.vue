<template>
  <div class="login">
    <h1>Edu boss管理系统</h1>
    <el-alert v-if="errorTip" :title="errorTip" type="warning" show-icon />
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      :class="{
        shaking: errorTip,
      }"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <el-button
          @click="handleSubmit"
          :disabled="loading"
          :loading="loading"
          >{{ btntext }}</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tohome">
      <span>← 回到 用户端</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/apis/user'
import { AxiosResponse } from 'axios'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
      },
      errorTip: '',
      loading: false
    }
  },
  computed: {
    btntext: {
      get (): string {
        return this.loading ? 'Loading...' : '登录'
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.loading = true
      try {
        this.errorTip = ''
        await (this.$refs.form as Form).validate()
        const { data } = await login(this.form)
        if (data.success) {
          const user = JSON.parse(data.content as string)
          this.$store.commit('setUser', user)
          const redirect = this.$route.query.redirect || '/'
          this.$router.push(redirect as string)
        } else {
          this.errorTip = data.message
        }
      } catch (error) {
        // TODO
      }
      this.loading = false
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  max-width: 22rem;
  margin: 0 auto;
  h1 {
    margin: 4.5rem 0 3.5rem;
    text-align: center;
    letter-spacing: 0.05em;
    color: rgba(0, 0, 0, 0.5);
    font-size: 3rem;
    font-weight: 300;
    text-decoration: none;
    transition: text-shadow 0.3s;
  }
  .el-form {
    margin-bottom: 2.5rem;
    padding: 1.875rem 1.25rem;
    background: #fff;
    border-radius: 5px;
    &.shaking {
      animation: shakeX 1s;
    }
    h2 {
      margin: 0 0 1rem;
      font-weight: 400;
      font-size: 1.5rem;
    }
    .el-button {
      margin-top: 0.5rem;
      width: 100%;
      color: #fff;
      background-color: #40586f;
      border-color: #40586f;
      &:hover {
        background: #66798c;
        border-color: #66798c;
      }
    }
  }
  .tohome {
    margin-bottom: 1rem;
    padding: 0.625rem;
    border: 0.0625rem solid rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
    cursor: not-allowed;
  }
}
</style>
