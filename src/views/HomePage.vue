<template>
  <div>
    <!-- 侧边栏 -->
    <van-nav-bar left-arrow fixed placeholder @click-left="onClickLeft" to="/">
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
    <!-- 标题结束 -->

    <!-- 轮播图播放 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#25c89b">
      <van-swipe-item>
        <van-image
          width="21rem"
          height="10rem"
          fit="cover"
          src="https://img.zcool.cn/community/01453560e6ae3311013eaf70170ab2.jpg@1280w_1l_2o_100sh.jpg"
      /></van-swipe-item>
      <van-swipe-item>
        <van-image
          width="21rem"
          height="10rem"
          fit="cover"
          src="https://img.zcool.cn/community/01155261dfe3fe11013f01cd7b2ca2.jpg@1280w_1l_2o_100sh.jpg"
      /></van-swipe-item>
      <van-swipe-item>
        <van-image
          width="21rem"
          height="10rem"
          fit="cover"
          src="https://img.zcool.cn/community/019f6c6188f89c11013e894316d315.jpg@1280w_1l_2o_100sh.jpg"
      /></van-swipe-item>
      <van-swipe-item>
        <van-image
          width="21rem"
          height="10rem"
          fit="cover"
          src="https://img.zcool.cn/community/01a05561df9c4d11013e8cd0376ad0.gif"
      /></van-swipe-item>
    </van-swipe>
    <div class="bannerimg"></div>

    <!-- 内容部分 -->
    <div class="banner">
      <van-grid
        :border="false"
        :column-num="2"
        direction="horizontal"
        placeholder
      >
        <van-grid-item>
          <div>
            <span>积分兑换</span><br />
            <span class="span1">好礼享受不停</span>
          </div>
          <van-image
            src="https://iconfont.alicdn.com/t/137d97e8-c31a-42cf-81e8-0477f1580ddc.png"
          />
        </van-grid-item>

        <van-grid-item>
          <div>
            <span>积分+兑换</span><br />
            <span class="span2">好礼享受不停</span>
          </div>

          <van-image
            src="https://iconfont.alicdn.com/t/a98aa5cb-cc84-40a0-9390-c3db404face2.png"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 积分兑换结束 -->

    <div class="prods">
      <div class="p-item" v-for="(item2, index2) in prodData" :key="index2">
        <div class="p-item-title">
          {{ item2.course_name }}
        </div>
        <div class=".p-item-img"><img src="item2.img " alt=""></div>
        <div class="p-item-tip">{{ item2.homeNametwo }}</div>

        <div class="p-item-price">￥{{ item2.price }}</div>
      </div>
    </div>
    、
    <!-- 底部导航栏 -->
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
import courseData from "../data/course";
export default {
  data() {
    return {
      prodData: courseData,
      active: 0,
      value: "",
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      this.$router.push("/");
    },
    onClickRight() {
      Toast("按钮");
    },
    onFocus() {
      this.$router.push("/Search");
    },
  },
};
</script>

<style lang="scss" scoped>
.prods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 55px;
}
.p-item {
  width: 49.9%;
  text-align: center;
}
.p-item-img {
  width: 100%;
}
.p-item-title {
  margin-top: 10px;
  font-weight: 700;
  font-size: 19px;
}
.p-item-tip {
  font-size: 12px;
  color: #666;
}
.p-item-price {
  color: red;
  font-size: 19px;
  margin: 10px;
  font-weight: 700;
}
.line {
  border-bottom: solid 1px #ccc;
}
.row {
  width: 100%;
}
.row img {
  width: 100%;
}
.van-col h3 {
  margin: 20px 10px;
}
.bannerimg {
  margin: auto;
}
.span2 {
  font-size: 0.2rem;
  font-weight: normal;
}
.span1 {
  font-size: 0.2rem;
  font-weight: normal;
}
span {
  font-size: 1rem;
  font-weight: bold;
}
.text1 {
  // margin: 0rem 0rem 0rem 0rem;
}
::v-deep .van-image {
  // position: relative;
  display: inline-block;
  left: 1.2rem;
}
::v-deep .banner .van-image__img {
  width: 5rem;
  height: 100%;
  left: 4rem;
  margin: 0rem 0rem 0rem 0rem;
}
::v-deep .van-image__error,
.van-image__img,
.van-image__loading {
  display: block;
  width: 50%;
  height: 100%;
  // left: 2rem;
}
.banner {
  width: 23rem;
  height: 7rem;
  background-color: rgba(238, 235, 235, 0.3);
  // margin-top: 3rem;
  margin: auto;
  box-shadow: 35px 35px 70px #25c89b, -35px -35px 70px #25c89b;
}
::v-deep .van-nav-bar__title {
  margin-left: 2.5rem; //输入框位置
}
::v-deep .van-icon-search:before {
  color: #25c89b;
  margin-left: -1rem;
}
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
.my-swipe .van-swipe-item {
  color: #25c89b;
  font-size: 20px;
  // line-height: 150px;
  // text-align: center;
  // background-color: #39a9ed;
}
</style>