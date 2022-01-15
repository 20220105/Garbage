import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:false,
    name:''
  },
  mutations: {
    loginOK(state,newname){
      state.islogin=true
      state.name=newname
    }
  },
  actions: {
  },
  modules: {
  }
})
