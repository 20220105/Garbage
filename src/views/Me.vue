<template>
  <div>
    <!-- 标题栏 -->
    <van-nav-bar @load="isLogin" title="我的" @click-left="$router.go(-1)">
      <template v-if="$store.state.islogin" #right>
        欢迎:{{ $store.state.nickname }}
      </template>
      <template v-else #right>
        <router-link to="/login">登录</router-link>
      </template>
    </van-nav-bar>

    <!-- 底部导航栏 -->
    <van-tabbar
      class="bottom_nav"
      :placeholder="true"
      :safe-area-inset-bottom="true"
      active-color="#25c89b"
      inactive-color="#9D9D9D"
      v-model="active"
    >
      <van-tabbar-item replace to="/" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/the_order" icon="column"
        >订单</van-tabbar-item
      >
      <van-tabbar-item replace to="/subscribe" icon="bell"
        >一键预约</van-tabbar-item
      >
      <van-tabbar-item replace to="/homepage" icon="shop">商城</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 4,
      selected: "main",
      loading: false,
    }
  },
  methods: {
    isLogin() {
      this.$store.commit("loginOK")
    },
  },
}
</script>

<style lang="scss" scoped>
// 头部背景样式
::v-deep .van-nav-bar {
  background-color: #25c89b;
}
//标题样式
::v-deep .van-nav-bar__title {
  color: #fff;
}
// 此处添加其它样式
// 底部导航栏
::v-deep .bottom_nav {
  .van-icon {
    font-size: 1.65rem;
  }
}
</style>
