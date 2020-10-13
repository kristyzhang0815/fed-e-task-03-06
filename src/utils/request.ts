import axios from 'axios'
import store from '@/store'
import router from '@/router'

let isrefreshing = false
const requestQueue: Array<Function> = []
const request = axios.create()

const toLogin = () => {
  router.replace('/login')
  setTimeout(() => {
    window.location.reload()
  }, 250)
}

const refreshToken = () => {
  return new Promise((resolve, reject) => {
    const user = store.state.user || {}
    if (user.refresh_token) {
      try {
        request.post(`/front/user/refresh_token?refreshtoken=${user.refresh_token}`).then(({ data: res }) => {
          const newUser = JSON.parse(res.content as string)
          store.commit('setUser', newUser)
          requestQueue.forEach(cb => cb())
          requestQueue.splice(0)
          resolve(res)
        }).catch(() => {
          reject(new Error('login timeout'))
          toLogin()
        })
      } catch (error) {
        reject(new Error('login timeout'))
        toLogin()
      }
    } else {
      reject(new Error('login timeout'))
      toLogin()
    }
  })
}

request.interceptors.request.use(config => {
  const user = store.state.user || {}
  if (user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

request.interceptors.response.use(response => {
  return Promise.resolve(response)
}, error => {
  return new Promise((resolve, reject) => {
    if (error.response) {
      const { status, config } = error.response
      if (status === 401) {
        if (!isrefreshing) {
          isrefreshing = true
          refreshToken()
        }
        requestQueue.push(() => { resolve(request(config)) })
      } else {
        reject(error)
      }
    } else {
      reject(error)
    }
  })
})

export default request
