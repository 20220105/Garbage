import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Address from './address'

export default new Vuex.Store({
  state: {
    islogin:false,
    nickname:''
  },
  mutations: {
    loginOK(state,newname){
      state.islogin=true
      state.nickname=newname
    }
  },
  actions: {
  },
  modules: {
    address: Address
  }
})
