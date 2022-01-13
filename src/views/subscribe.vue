<template>
  <div class="container">
    <!-- <custom-navbar title="回收预约"></custom-navbar> -->
    <div class="navbar"><div>回收预约</div></div>
    <div class="block">
      <div class="nav">
        <div class="nav_icon">
          <div class="nav_icon2"></div>
          <div class="nav_icon1"></div>
        </div>
        <div class="nav_title">选择回收分类</div>
          <div class="nav_title nav_right">已选择：{{recycleClass[currentRecycle].title}}</div>
      </div>
      <div class="content">
        <div class="scroll-view">
          <div
            class="scroll-item"
            v-for="(item, index) in recycleClass"
            :key="index"
            @click="recycleChange(index)"
          >
            <div
              :class="{
                'scroll-item-img': true,
                'scroll-item-img-selected': currentRecycle === index,
              }"
            >
            <!-- 图片组件 -->
              <van-image fit="contain" :src="item.img"></van-image>
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="content">
        <div v-if="areaEnable">这里是区域可用时的代码</div>
        <div class="area_unavailable_tip" v-else>当前区域未开通</div>
      </div>
    </div>
    <div class="block">
      <div class="nav">
        <div class="nav_icon">
          <div class="nav_icon2"></div>
          <div class="nav_icon1"></div>
        </div>
        <div class="nav_title">预估重量</div>
      </div>
      <div class="content">
        <div class="grid">
          <!-- 重量范围 -->
          <weight-range
            class="item"
            @click.native="selectWeight(index)"
            v-for="(item, index) in estimateWeight"
            :key="index"
            :checked="currentEstimateWeight === index"
          >
            {{ item.range }}
          </weight-range>
        </div>
        <div class="item">
          <!-- 图标组件 -->
          <van-icon
            name="warning"
            color="#FFA555"
            size="0.7598rem"
            class="item_icon"
          ></van-icon>
          <div class="title">注意事项：小于10公斤暂不保证上门回收</div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="content">
        <div class="item">
          <van-icon
            name="clock"
            color="#C0C0C0"
            size="0.7598rem"
            class="item_icon"
          ></van-icon>
          <div class="title">上门时间</div>
          <div class="flex_title">
            <div
              :class="{ content: true, active: pickerValue.length > 0 }"
              @click="timePickerShow = true"
            >
              {{
                pickerValue.length > 0
                  ? pickerValue.join(" ")
                  : "请选择上门时间"
              }}
            </div>
            <div
              v-if="timePickerShow"
              style="
                position: fixed;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.3);
                z-index: 11;
              "
            >
            <!-- 时间 多列选择  van-picker -->
              <van-picker
                style="position: absolute; width: 100%; left: 0; bottom: 0"
                show-toolbar
                :columns="timeRange"
                @confirm="timePickerChange"
                @cancel="timePickerShow = false"
              />
            </div>
            <van-icon name="arrow" color="#c0c0c0" size="0.64rem"></van-icon>
          </div>
        </div>
        <van-divider></van-divider>
        <div class="item">
          <van-icon
            name="location"
            color="#C0C0C0"
            size="0.7598rem"
            class="item_icon"
          ></van-icon>
          <div class="title">预约地址</div>
          <div class="flex_title">
            <div class="content">请选择预约地址</div>
            <van-icon name="arrow" color="#c0c0c0" size="0.64rem"></van-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="nav">
        <div class="nav_icon">
          <div class="nav_icon2"></div>
          <div class="nav_icon1"></div>
        </div>
        <div class="nav_title">预估备注</div>
      </div>
      <div class="content">
        <input id="comment" placeholder="请填写备注" v-model="comment" />
      </div>
    </div>
    <div class="footer">
      <div class="clause">
        预约下单代表您已同意<router-link to="/" class="link"
          >《免责条款》</router-link
        >
      </div>
      <!-- van-button -->
      <van-button
        :type="allowSubmit ? 'primary' : 'default'"
        round
        size="large"
        :disabled="!allowSubmit"
        style="height: 2rem"
      >
        {{ allowSubmit ? "立即预约" : "无法预约" }}
      </van-button>
    </div>
  </div>
  
</template>

<script>
import WeightRange from "../components/WeightRange.vue";
export default {
  components: {
   WeightRange,
  },

  data() {
    return {
      areaEnable: false, //当前区域是否开通
      comment: "", //备注 双向绑定
      allowSubmit: false, //是否允许提交 用于控制立即预约按钮样式和可用性(disabled)
      estimateWeight: [
        {
          //预估重量
          id: 0,
          range: "10-25kg",
        },
        {
          id: 1,
          range: "25-50kg",
        },
        {
          id: 2,
          range: "50-100kg",
        },
        {
          id: 3,
          range: "100kg以上",
        },
      ],
      currentEstimateWeight: 0, //当前选中的预估重量
      timePickerShow: false,
      pickerValue: [],

      timeRange: [
        // 搭配van-picker  上门时间
        {
          values: ["2022-01-11"],
          defaultIndex: 1,
        },
        {
          values: ["9:00-10:00", "10:00-11:00", "11:00-12:00"],
          defaultIndex: 1,
        },
      ],
      recycleClass: [
        {
          id: 0,
          title: "衣物",
          img: "https://img.alicdn.com/imgextra/i1/3497747571/O1CN01JULpcW25nZGeaInfg_!!3497747571.jpg",
        },
        {
          id: 1,
          title: "家电类",
          img: "https://img.alicdn.com/imgextra/i1/3497747571/O1CN01JULpcW25nZGeaInfg_!!3497747571.jpg",
        },
        {
          id: 2,
          title: "塑料类",
          img: "https://img.alicdn.com/imgextra/i1/3497747571/O1CN01JULpcW25nZGeaInfg_!!3497747571.jpg",
        },
        {
          id: 4,
          title: "金属类",
          img: "https://img.alicdn.com/imgextra/i1/3497747571/O1CN01JULpcW25nZGeaInfg_!!3497747571.jpg",
        },
        {
          id: 4,
          title: "纸类",
          img: "https://img.alicdn.com/imgextra/i1/3497747571/O1CN01JULpcW25nZGeaInfg_!!3497747571.jpg",
        },
      ],
      currentRecycle: 0, //当前选择的回收分类
    };
  },
  methods: {
    recycleChange(id) {
      this.currentRecycle = id;
    },
    timePickerChange(e) {
      this.pickerValue = e;
      this.timePickerShow = false;
    },
    selectWeight(id) {
      this.currentEstimateWeight = id;
    },
  },
};
</script>

<style>
html {
  background-color: #f4f5f6;
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 3.84rem;
  width: 30rem;
  background-color: #fff;
  position: relative;
}
.navbar > div {
  height: 3.84rem;
  width: 30rem;
  background-color: #fff;
  border-bottom: 0.0401rem solid #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1197rem;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.container {
  width: 30rem;
  height: auto;
  padding-bottom: 3.2rem;
  position: relative;
}
.block {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding: 1.2rem;
  box-sizing: border-box;
  margin-bottom: 0.8003rem;
}
.nav {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.8003rem;
}
.nav > .nav_icon {
  height: 100%;
  margin-right: 0.8003rem;
  width: 1.2rem;
  position: relative;
}
.nav > .nav_icon > .nav_icon1 {
  background-color: #23bd6d;
  position: absolute;
  right: 45%;
  top: 0.3601rem;
  width: 0.4401rem;
  height: 1.2rem;
  border-radius: 0.2798rem 0 0.2798rem 0;
}
.nav > .nav_icon > .nav_icon2 {
  background-color: #ffdf95;
  position: absolute;
  left: 50%;
  bottom: 0.3601rem;
  width: 0.4401rem;
  height: 1.2rem;
  border-radius: 0.2798rem 0 0.2798rem 0;
}
.nav > .nav_title {
  font-weight: 600;
  font-size: 1.1197rem;
}
.nav > .nav_right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}
.block > .content {
  display: flex;
  flex-direction: column;
}
.block > .content > .item {
  box-sizing: border-box;
  padding: 0.6001rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.0403rem;
  font-weight: 600;
}
.block > .content > .item > .item_icon {
  margin-right: 0.8003rem;
}
.block > .content > .item > .title {
  min-width: 5.6003rem;
}
.block > .content > .item > .flex_title {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.block > .content > .item > .flex_title .content {
  color: #c0c0c0;
  font-size: 1.0403rem;
}
.block > .content > .item > .flex_title .content.active {
  color: #000;
}
.area_unavailable_tip {
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.0403rem;
}
#comment {
  font-size: 1.0403rem;
  border: none;
}
.footer {
  display: flex;
  flex-direction: column;
  padding: 0 3.2rem;
}
.footer > .clause {
  width: 100%;
  text-align: center;
  margin: 1.2rem 0;
  font-size: 1.0403rem;
  color: #a0a0a0;
}
.footer > .clause > .link {
  color: #25c90b;
  display: inline;
}
.grid {
  width: 100%;
}
.grid > .item {
  display: inline-block;
  width: calc(50% - 0.6001rem);
  box-sizing: border-box;
  margin-bottom: 1.2rem;
}
.grid > .item:nth-of-type(odd) {
  margin-right: 0.6001rem;
}
.grid > .item:nth-of-type(even) {
  margin-left: 0.6001rem;
}
.scroll-view {
  margin-top: 0.4rem;
  height: 8rem;
  white-space: nowrap;
  overflow-x: scroll;
}
.scroll-view::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.scroll-item {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1.0403rem;
  height: 100%;
  width: 8rem;
}
.scroll-item-img {
  height: 5.2rem;
  width: 5.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  border: 0.24rem solid #ffffff;
}
.scroll-item-img.scroll-item-img-selected {
  border: 0.24rem solid #25c90b;
}
.scroll-item-img > image {
  width: 100%;
  height: 100%;
}
</style>