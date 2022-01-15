<template>
  <div>
    <!-- 侧边栏 -->
    <van-nav-bar left-arrow fixed>
      <template #title>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          background="#25c89b"
          @focus="onFocus"
        />
      </template>
      <template #right>
        <van-icon name="share" size="25" color="#fff" />
      </template>
    </van-nav-bar>

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
      value: "",
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
    onFocus() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
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
body {
}
// .sskimg {
//   position: relative;
//   img {
//     width: 12rem;
//     position: absolute;

//     // transform: translateY(-50%);
//     margin: 0 0 0 0;
//   }
// }
::v-deep .van-search {
  width: 14rem;
  height: 1rem;
  margin: 0 0 0 0;
  padding: 1rem 0;
}
::v-deep.van-search .van-cell {
  padding: 0 1rem;
}
</style>