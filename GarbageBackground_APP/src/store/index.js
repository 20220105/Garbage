import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem("islogin"), //定义是否已登录状态
    nickname: sessionStorage.getItem("collectorUser"), //保存当前登录用户名
    id: sessionStorage.getItem("Id"),
    phone: sessionStorage.getItem("phone"),
  },
  mutations: {
    loginOK(state, newNickname) {
      state.islogin = true
      state.nickname = newNickname
      sessionStorage.setItem("islogin", true)
      sessionStorage.setItem("name", newNickname)
    },
    loginOKId(state, newId) {
      state.islogin = true
      state.id = newId
      sessionStorage.setItem("islogin", true)
      sessionStorage.setItem("id", newId)
    },
    loginOKPhone(state, newPhone) {
      state.islogin = true
      state.phone = newPhone
      sessionStorage.setItem("islogin", true)
      sessionStorage.setItem("phone", newPhone)
    },
  },
  actions: {},
  modules: {},
})
