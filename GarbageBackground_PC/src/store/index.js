import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem("islogin"), //定义是否已登录状态
    name: sessionStorage.getItem("name"), //保存当前登录用户名
    id: sessionStorage.getItem("Id"),
  },
  mutations: {
    loginOK(state, newName) {
      state.islogin = true
      state.name = newName
      sessionStorage.setItem("islogin", true)
      sessionStorage.setItem("name", newName)
    },
    loginOKId(state, newId) {
      state.islogin = true
      state.id = newId
      sessionStorage.setItem("islogin", true)
      sessionStorage.setItem("id", newId)
    },
  },
  actions: {},
  modules: {},
})
