<template>
  <div>
    <van-nav-bar
      title="订单"
      left-text="返回首页"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <o-tabs></o-tabs>
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
      <van-tabbar-item replace to="/" icon="column">订单</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="bell">一键预约</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="shop">商城</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue'
import OTabs from "../components/oTabs.vue"
export default {
  components: { OTabs },
  data() {
    return {
      active: 1,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/")
    },
  },
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #25c89b;
}
::v-deep .van-nav-bar__title {
  color: white;
}
::v-deep .van-icon-arrow-left:before {
  color: white;
}
::v-deep .van-nav-bar__text {
  color: white;
}
</style>
