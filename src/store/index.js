import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    DIS_SET_TOKEN({
      commit
    }, payload) {
      commit("SET_TOKEN", payload)
    }
  },
  modules: {}
})