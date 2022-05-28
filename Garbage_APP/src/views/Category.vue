<template>
  <div>
    <!-- 侧边栏 -->
    <van-nav-bar
      title="更多"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-row>
      <van-col :span="6">
        <van-sidebar v-model="active">
          <van-sidebar-item
            @click="url(item.id)"
            :title="item.name"
            v-for="(item, index) in leftnavdata"
            :key="index"
          />
        </van-sidebar>
      </van-col>
      <van-col :span="18" class="cells">
        <div class="cell" v-for="(item2, index2) in rightdata" :key="index2">
          <img :src="item2.img" alt="" />
          <div class="title">{{ item2.name }}</div>
        </div>
      </van-col>
    </van-row>

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
import data from "../static/data.json";
export default {
  data() {
    return {
      active: 1,
      activ: 1,
      leftnavdata: data.data.classify.left,
      rightdata: data.data.classify.right[0].right_data,
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    url(id) {
      console.log(id);
      this.rightdata = data.data.classify.right[id].right_data;
      console.log(this.rightdata);
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
::v-deep .zheng {
  float: left !important;
  height: 8rem;
  width: 5rem;
}
::v-deep .you {
  // padding: 1rem;
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
.cells {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.cell {
  width: 33.33%;
  margin: 15px 0;
}
.cell img {
  width: 100%;
}
.cell .title {
  text-align: center;
  font-size: 11px;
  color: #666;
}
.van-sidebar {
  width: 90px;
}
</style>