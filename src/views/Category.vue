<template>
  <div>
    <!-- 侧边栏 -->
    <van-nav-bar
      title="测试分类1"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-tree-select
      height="38.5rem"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <!-- 电子产品 -->
        <div class="zheng">
          <van-image
            v-if="active === 0"
            src="https://img01.yzcdn.cn/vant/apple-1.jpg"
          />
          <div class="you">测试商品1</div>
          <div class="you">测试商品1</div>

          <!-- 图片结束 -->
        </div>
        <!-- 电子产品结束 -->
        <van-image
          v-if="active === 1"
          src="https://img01.yzcdn.cn/vant/apple-2.jpg"
        />
      </template>
    </van-tree-select>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="activ" active-color="#25c89b" fixed>
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
      active: 1,
      activ: 1,
      items: [
        { text: "电子产品" },
        { text: "家电" },
        { text: "陶瓷" },
        { text: "塑料" },
        { text: "铜" },
        { text: "Dio" },
        { text: "承太郎" },
        { text: "徐伦" },
        { text: "仗助" },
      ],
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-tree-select__nav-item {
  padding: 5rem 1rem;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
}
::v-deep .van-sidebar-item--select::before {
  position: absolute;
  top: 50%;
  border-radius: 20%;
  left: 0;
  width: 0.3rem;
  height: 2.8rem;
  background-color: #25c89b;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: "";
}
::v-deep .van-image__img {
  left: 0;
  width: 6rem;
  height: 100%;
}
::v-deep .zheng{
  float: left !important;
  height: 8rem;
  width: 5rem;
}
::v-deep .you{
  // padding: 1rem;
}
</style>