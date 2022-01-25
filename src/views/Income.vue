<template>
  <div>
    <van-nav-bar title="收入明细" left-arrow @click-left="onClickLeft" />
    <div class="zichan">
      <span>我的净资产(元)</span>
      <span><span>￥</span>{{ money | xiaoshudian }}</span>
    </div>
    <van-tabs @click="onClick" animated>
      <van-tab title="支出明细">
        <van-empty description="暂无记录" v-if="!income.length" />
        <div v-else v-for="(item, i) in income" :key="i">
          <van-cell :border="false" :value="'-' + item.extend_price + '元'">
            <template #title>
              <div>{{ item.extend_name }}</div>
              <div class="date">{{ item.extend_data | Date }}</div>
            </template>
          </van-cell>
        </div>
      </van-tab>
      <van-tab title="收入明细"
        ><van-empty description="暂无记录" v-if="!income.length" />
        <div v-else v-for="(item, i) in income" :key="i">
          <van-cell :border="false" :value="'+' + item.extend_price + '元'">
            <template #title>
              <div>{{ item.extend_name }}</div>
              <div class="date">{{ item.extend_data | Date }}</div>
            </template>
          </van-cell>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      income: [],
      spending: [],
      money: "",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClick(name, title) {
      let uid = sessionStorage.getItem("id")
      let url = `/shouzhi/${uid}/${name}`
      this.axios.get(url).then((res) => {
        this.income = res.data.results
        // console.log(this.income)
      })
      this.money = this.$route.query.money
    },
  },
  mounted() {
    this.onClick(0)
  },
  filters: {
    // 时间处理
    Date(value) {
      let date = moment(value).format("YYYY年MM月DD日 HH时mm分ss秒")
      return date
    },
    // 保留两位小数点
    xiaoshudian(value) {
      var toFixedNum = Number(value).toFixed(3)
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
      return realVal
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
.zichan {
  background-color: #25c89b;
  color: #fff;
  padding: 1rem;
  span {
    display: block;
  }
  :nth-child(1) {
    font-size: 1.1rem;
  }
  :nth-child(2) {
    font-size: 2.3rem;
    padding: 1.9rem 0;
    span {
      display: inline;
    }
  }
}
.date {
  font-size: 0.5rem;
  color: #969799;
}
</style>
