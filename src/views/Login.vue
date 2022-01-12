<template>
  <div>
    <!--标题栏-->
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <router-link to="/register">新用户</router-link>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>