<template>
  <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template v-if="$store.state.islogin" #right>
        欢迎:{{$store.state.name}}
      </template>
      <template v-else #right>
          <router-link to="/login">登录</router-link>
      </template>
  </van-nav-bar>
  
</template>

<script>
export default {

}
</script>

<style>

</style>