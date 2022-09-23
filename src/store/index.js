import Vue from 'vue'
import Vuex from 'vuex'
import {
  SetToken,
  GetToken
} from "../utils/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: GetToken() || ""
  },
  getters: {
    token(state) {
      return state.token
    }
  },
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