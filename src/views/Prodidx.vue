<template>
  <div class="iframe">
    <!-- 侧边栏 -->
    <van-nav-bar
      title="产品详情"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-row>
      <van-swipe :autoplay="3000">
        <van-swipe-item
          style="height: 500px"
          v-for="(item, index) in images"
          :key="index"
        >
          <img :src="item.swipe" />
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <!-- 标题行 -->
    <van-row class="row">
      <div class="title">{{ curData.homeName }}</div>
      <div class="tip">
        <span class="bright">{{ curData.homeBright }}</span>
        <span class="title2">{{ curData.homeTitle }}</span>
      </div>
    </van-row>
    <!-- 价格行 -->
    <van-row class="row">
      <div class="price">￥{{ curData.homePrice }}</div>
    </van-row>
    <!-- 购买行 -->
    <van-row class="row num">
      <span class="tip">购买数量:</span>
      <span class="btn" @click="rdu()">-</span>
      <input class="txt" type="text" readonly v-model="num" />
      <span class="btn" @click="add()">+</span>
    </van-row>
    <!-- 弹框行 -->
    <van-row class="row">
      <van-cell @click="show = true" title="支持花呗 支持以旧换新" is-link />
    </van-row>
    <van-action-sheet v-model="show" title="服务说明">
      <div class="line"></div>
      <ul class="ul2">
        <li class="title">支持花呗分期</li>
        <li>商品支持花呗分期</li>
        <li class="title">可以使用换现奖励金</li>
        <li>通过参加活动，以旧换新，获取手机</li>
        <li>享受额外补贴</li>
      </ul>
      <div class="line"></div>
      <div class="btn3">
        <van-button @click="show = false" type="primary" round size="large"
          >关闭
        </van-button>
      </div>
    </van-action-sheet>
    <!-- 产品详细行 -->
    <van-row>
      <van-col :span="24">
        <van-tabs>
          <van-tab title="图片详细">
            <div class="imgs" v-for="(item, index) in arrImgs" :key="index">
              <img :src="item.one" style="width: 100%" alt="" />
            </div>
          </van-tab>
          <van-tab title="参数">
            <div class="right" v-html="strRight"></div>
          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>
    <!-- 底部导航 -->
    <van-action-bar>
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-icon
        icon="star"
        v-show="blnCollect"
        color="red"
        @click="collect()"
        text="取消"
      />
      <van-action-bar-icon
        icon="star"
        v-show="!blnCollect"
        @click="collect()"
        text="收藏"
      />
      <van-action-bar-icon
        icon="cart-o"
        @click="url()"
        v-show="cart.length == 0"
        text="购物车"
      />
      <van-action-bar-icon
        icon="cart-o"
        @click="url()"
        v-show="cart.length != 0"
        :badge="cart.length"
        text="购物车"
      />
      <van-action-bar-button
        @click="addCart"
        type="warning"
        text="加入购物车"
      />
      <van-action-bar-button type="danger" text="提交订单" />
    </van-action-bar>
  </div>
</template>

<script>
import data from "../static/data.json";
let home = data.data.home;
export default {
  data() {
    return {
      images: [],
      curData: [],
      blnCollect: false,
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
      badge: 0,
      num: 1,
      show: false,
      arrImgs: [],
      strRight: "",
    };
  },
  methods: {
        onClickLeft() {
      this.$router.go(-1);
    },
    collect() {
      // 获取本地收藏的存储对象
      let _arr = localStorage.getItem("collects")
        ? JSON.parse(localStorage.getItem("collects"))
        : [];
      // 判断是否已收藏
      if (!this.blnCollect) {
        // 定义一个对象
        let _obj = {
          id: this.curData.id,
          url: this.curData.homeImg,
          name: this.curData.homeName,
          price: this.curData.homePrice,
        };
        // 将对象添加到数据中
        _arr.push(_obj);
        // 保存到本地存储对象中
        localStorage.setItem("collects", JSON.stringify(_arr));
        // 更新收藏的状态
        this.blnCollect = true;
      }
    },
    addCart() {
      let _arr = [];
      let _obj = null;
      if (localStorage.getItem("cart")) {
        _arr = JSON.parse(localStorage.getItem("cart"));
        let that = this;
        let _search = _arr.filter((item) => {
          return item.id == that.curData.id;
        });
        if (_search.length == 0) {
          _obj = {
            id: this.curData.id,
            imgurl: this.curData.homeImg,
            price: this.curData.homePrice,
            title: this.curData.homeName,
            num: 1,
            checked: false,
          };
          _arr.push(_obj);
          localStorage.setItem("cart", JSON.stringify(_arr));
        }
      } else {
        _obj = {
          id: this.curData.id,
          imgurl: this.curData.homeImg,
          price: this.curData.homePrice,
          title: this.curData.homeName,
          num: 1,
          checked: false,
        };
        _arr.push(_obj);
        localStorage.setItem("cart", JSON.stringify(_arr));
      }
      //重新保存购物车中产品数据
      this.cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    },
    url() {
      this.$router.push("/cart");
      // this vue实例化对象 $表示原生对象 router路由对象,push向对象增加路径，
      // 义译：跳转到指定的路径
    },
    rdu() {
      if (this.num > 1) {
        this.num--;
      }
    },
    add() {
      this.num++;
    },
  },
  mounted: function () {
    let _id = this.$router.currentRoute._value.query.id;
    let _prodData = home.filter((item) => {
      return item.id == _id;
    });

    // 检测是否被收藏过
    let _arr = localStorage.getItem("collects")
      ? JSON.parse(localStorage.getItem("collects"))
      : [];
    let _prod = _arr.filter((item) => {
      return item.id == _id;
    });

    if (_prod.length > 0) {
      this.blnCollect = true;
    }

    this.curData = _prodData[0];
    this.images = _prodData[0].homeSwipe;
    // 获取全部展示的图片
    this.arrImgs = _prodData[0].Images;
    // 获取配置内容
    this.strRight = _prodData[0].homePeizhi;
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
.row {
  padding: 8px;
}
.row .title {
  font-size: 20px;
  font-weight: 700;
}
.row .tip .bright {
  color: red;
  margin-right: 4px;
}
.row .price {
  font-size: 23px;
  font-weight: 700;
  color: red;
}
.line {
  border-bottom: solid 1px #ccc;
}
.right {
  background-color: #eee;
  padding: 20px 10px;
}
.right h3 {
  padding-bottom: 10px;
  border-bottom: solid 1px #ccc;
}
.right p {
  line-height: 10px;
  color: #666;
}
.imgs {
  margin-top: -5px;
}
.btn3 {
  margin: 10px 0;
  padding: 8px;
}
.ul2 {
  padding: 20px 30px;
}
.ul2 .title {
  font-size: 18px;
  font-weight: 700;
}
.ul2 li {
  line-height: 28px;
}
.num {
  padding: 20px 10px;
  background-color: #ccc;
  display: flex;
}
.num .tip {
  margin: 5px 12px 0 0;
}
.num .btn {
  width: 30px;
  background-color: #fff;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border: solid 1px #ccc;
}
.num .txt {
  width: 50px;
}
.iframe {
  margin-bottom: 50px;
}
</style>


