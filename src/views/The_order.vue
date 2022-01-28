<template>
  <div>
    <van-nav-bar title="订单"></van-nav-bar>
    <o-tabs :StateActive="this.$route.query.pageActive"></o-tabs>
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
// import HelloWorld from '../components/HelloWorld.vue'
import OTabs from "../components/oTabs.vue"
export default {
  components: { OTabs },
  data() {
    return {
      active: 1,
      pageActive: 3,
    }
  },
  methods: {
    getactive() {
      // this.pageActive = this.$route.query.pageActive
      // this.pageActive = this.pageActive
      // console.log("状态", this.pageActive)
    },
  },
  mounted() {},
  created() {
    this.getactive()
  },
}
</script>

<style lang="scss" scoped>
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
// 底部导航栏
::v-deep .bottom_nav {
  .van-icon {
    font-size: 1.65rem;
  }
}
</style>
