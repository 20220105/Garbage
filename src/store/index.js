import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import Address from "./address"

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem("islogin"), //定义是否已登录状态
    nickname: sessionStorage.getItem("name"), //保存当前登录用户名
    id: sessionStorage.getItem("Id"),
    url: sessionStorage.getItem("url"),
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
    loginOKUrl(state, newUrl) {
      state.islogin = true
      state.url = newUrl
      sessionStorage.setItem("islogin", true)
      sessionStorage.setItem("url", newUrl)
    },
  },
  actions: {},
  modules: {
    address: Address,
  },
})
