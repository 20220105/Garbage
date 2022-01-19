<template>
  <van-nav-bar @load="isLogin" title="我的" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template v-if="$store.state.islogin" #right>
        欢迎:{{$store.state.nickname}}
      </template>
      <template v-else #right>
          <router-link to="/login">登录</router-link>
      </template>
  </van-nav-bar>
  
</template>

<script>
export default {
  data(){
    return{
      selected:'main',
      loading:false
    }
  },
  methods:{
    isLogin(){
      this.$store.commit('loginOK')
    }
  }
}
</script>

<style>

</style>