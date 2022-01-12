<template>
  <div>
    <p>这是第三个</p>
    <van-tabbar v-model="active" active-color="#25c89b" fixed>
      <van-tabbar-item icon="home-o" replace to="/HomePage">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" replace to="/Category"
        >分类</van-tabbar-item
      >

      <van-tabbar-item replace  icon="friends-o" to="/Mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
    return {
      active: 2,
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: 'primary', message: index });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>