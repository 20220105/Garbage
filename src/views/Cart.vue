<template>
  <div class="iframe">
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      title="购物车"
      @click-left="onClickLeft"
    />

    <!-- 绑定购物车数据 -->
    <ul class="cart">
      <li v-for="(item, index) in cart" :key="index">
        <van-checkbox v-model="item.checked" icon-size="24px" />
        <van-image width="100px" fit="cover" :src="require('@/static/img/prod/p_01.webp')" />

        <div class="price">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}</p>
          <div class="num">
            <span @click="redu(index)">-</span>
            <input type="text" v-model="item.num" />
            <span @click="add(index)">+</span>
          </div>
        </div>
        <!-- 删除 -->
        <van-icon @click="dele(index)" name="delete-o" size="20px" />
      </li>
    </ul>
    <!-- 购物车为空时的提示信息 -->
    <div class="error" v-show="cart.length == 0">当前你的购物车为空!</div>
    <!-- 添加合计的导航栏 -->
    <van-goods-action v-show="cart.length != 0">
      <van-checkbox
        @click="onAllchecked()"
        class="allchecked"
        v-model="allchecked"
        icon-size="24px"
      >
        全选 <span v-show="false">{{ (allchecked = getAllChecked) }}</span>
      </van-checkbox>
      <span class="sum">
        合计:<span>￥{{ getSumPrice }}</span>
      </span>
      <van-goods-action-button
        type="danger"
        text="立即结算"
        @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>
<script>
import { Dialog } from 'vant';


export default {
  
  data() {
    return {
      // imgs:require("@/static/img/prod/" + item.imgurl),
      // imgs: require("@/static/img/prod/p_01.webp"),
      allchecked: false,
      num: 1,
      checked: true,
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    };
  },
  computed: {
    getSumPrice: function () {
      let _sumprice = 0;
      this.cart.forEach((item) => {
        if (item.checked) {
          _sumprice += item.price * item.num;
        }
      });
      return _sumprice;
    },
    getAllChecked: function () {
      let _tmpStatus = true;
      this.cart.forEach((item) => {
        if (!item.checked) {
          _tmpStatus = false;
        }
      });
      return _tmpStatus;
    },
  },
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onAllchecked() {
      if (!this.allchecked) {
        this.cart.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cart.forEach((item) => {
          item.checked = true;
        });
      }
    },
    dele(index) {
      Dialog.confirm({
        title: "分类选择告诉您",
        message: "你真的要删除这条记录吗？",
      })
        .then(() => {
          console.log(index);
          this.cart.splice(index, 1);
          // 将删除后的数据保存至本地存储对象中
          localStorage.setItem("cart", JSON.stringify(this.cart));
        })
        .catch(() => {
          // on cancel
        });
    },
    redu(index) {
      if (this.cart[index].num > 1) {
        this.cart[index].num--;
      }
    },
    add(index) {
      this.cart[index].num++;
    },
  },
};
</script>
<style>
body {
  background-color: #eee;
}
h3,
p {
  padding: 0;
  margin: 8px 0;
}
.allchecked {
  margin-left: 20px;
}
.sum {
  margin-left: 20px;
  width: 140px;
  display: inline-block;
}
.sum span {
  color: red;
  font-size: 20px;
}
.error {
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 18px;
  color: red;
}
.cart {
  margin-top: 50px;
}
.cart li {
  display: flex;
  padding: 8px 20px;
  border-bottom: solid 1px #ccc;
  justify-content: space-between;
  background-color: #fff;
}
.cart li .price {
  font-size: 13px;
  width: 160px;
}
.cart li .price span {
  display: inline-block;
  width: 23px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  border: solid 1px #ccc;
}
.cart li .price p {
  color: red;
}
.cart li .price input {
  width: 30px;
  border: solid 1px #ccc;
  padding: 4px;
}
</style>


