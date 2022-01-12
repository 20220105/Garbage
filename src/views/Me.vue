<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #right>
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