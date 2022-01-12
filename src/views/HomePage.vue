<template>
  <div>
    <!-- 侧边栏 -->
    <!-- <van-nav-bar
      title=""
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    >
</van-nav-bar> -->
    <div class="tou">
      <van-icon name="arrow-left"
       to="/" 
       size="1.8rem"
       />
      <!-- 输入框 -->
      <!-- <van-image :src="require('../assets/img/q/ssk.jpg')" fixed /> -->
      <!-- 输入框结束 -->
    </div>

    <p>这是第一个</p>
    <van-tabbar v-model="active" active-color="#25c89b" fixed>
      <van-tabbar-item icon="home-o" replace to="/HomePage"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="apps-o" replace to="/Category"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace icon="friends-o" to="/Mine"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-icon-arrow-left:before{
  margin: 0.7rem 0 0 0;
  color: aliceblue;
}
.tou {
  width: 100%;
  height: 3rem;
  background-color: #25c89b;
}
::v-deep .van-nav-bar__content {
  background-color: #25c89b;
}
::v-deep .van-nav-bar__left {
  color: aliceblue !important;
}
::v-deep .van-image__img {
  margin-top: 0.6rem;
  margin-left: 3rem;
  width: 60%;
  height: 60%;
  // position: absolute;
  // top: 50%;
  // transform: translateY(-50%);
}
::deep .van-image {
  // position: absolute !important;
}
v-deep .van-nav-bar__content {
  // position: absolute !important;
}
</style>