<template>
  <div>
    <van-nav-bar title="客服" left-arrow @click-left="onClickLeft" />
    <van-empty description="此功能正在开发中!敬请期待" />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1)
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
// 头部返回按钮旁边的文字
::v-deep .van-nav-bar__text {
  color: #fff;
}
//头部的返回按钮样式
::v-deep .van-nav-bar__arrow {
  color: #fff;
}
</style>
