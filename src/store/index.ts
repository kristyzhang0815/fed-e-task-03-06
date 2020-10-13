import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapse: false,
    user: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: '',
      // eslint-disable-next-line @typescript-eslint/camelcase
      refresh_token: ''
    }
  },
  mutations: {
    setCollapse (state, payload) {
      state.collapse = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
