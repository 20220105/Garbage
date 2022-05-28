<template>
  <div :style="{ height: h + 'px' }">
    <!-- 标题栏 -->
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <van-steps :active="active" active-icon="checked">
      <van-step>待服务</van-step>
      <van-step>服务中</van-step>
      <van-step>已称重</van-step>
      <van-step
        v-if="
          !order.state_id != 5 && order.state_id != 6 && order.state_id != 7
        "
        >已入库</van-step
      >
      <van-step
        v-if="!(order.state_id != 6) && order.state_id != 7"
        active-icon="checked"
        >入库失败</van-step
      >
      <van-step v-if="!(order.state_id != 7)" active-icon="checked"
        >已取消</van-step
      >
    </van-steps>
    <van-panel
      :title="`订单号:${order.order_num}`"
      :desc="`类型:${order.sortChoice} 重量:${order.w_range}`"
      :status="order.state_name"
    >
      <van-cell-group inset>
        <van-cell title="预估回收价格" :value="yugu_price | xiaoshudian" />
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item title="地址" name="1">{{
            order.address
          }}</van-collapse-item>
        </van-collapse>
        <van-cell title="下单时间" :label="order.order_time | Date" />
        <van-cell
          title="预计上门时间/已取货时间"
          :label="order.order_complete_time | Date"
        />
        <van-cell title="联系人" :value="order.name" />
        <van-cell title="联系电话" :value="order.phone" />
        <van-collapse v-model="activename" accordion>
          <van-collapse-item title="备注" name="1">{{
            order.note
          }}</van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </van-panel>
    <van-button
      type="primary"
      block
      class="btn"
      v-if="active == 0"
      @click="insertState(3)"
      >已上门取货</van-button
    >
    <van-button
      type="primary"
      block
      class="btn"
      v-if="active == 1"
      @click="insertState(4)"
      >已称重</van-button
    >
    <div
      v-if="active == 2"
      style="display: flex"
      :style="{ marginTop: h - 651 + 'px' }"
    >
      <van-button type="primary" block round @click="insertState(5)"
        >入库成功</van-button
      >
      <van-button type="primary" block round @click="insertState(6)"
        >入库失败</van-button
      >
    </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      active: "",
      order: "",
      activeName: "1",
      activename: "1",
      yugu_price: 0,
      h: "",
    }
  },
  methods: {
    // 获取当前视口的高度
    windowHeight() {
      let de = document.documentElement
      let h =
        self.innerHeight ||
        (de && de.offsetHeight) ||
        document.body.offsetHeight
      this.h = h
      console.log("hs", this.h)
    },
    onClickLeft() {
      this.$router.go("-1")
    },
    getOrder() {
      let params = `orderId=${this.$route.query.orderID}`
      this.axios.post("/order_details_collector", params).then((res) => {
        this.order = res.data.result
        console.log(this.order)
        if (this.order.sortChoice == "衣物") {
          this.price_jisuan(0.8)
        } else if (this.order.sortChoice == "家电类") {
          this.price_jisuan(0.6)
        } else if (this.order.sortChoice == "塑料类") {
          this.price_jisuan(0.2)
        } else if (this.order.sortChoice == "金属类") {
          this.price_jisuan(1.6)
        } else if (this.order.sortChoice == "纸类") {
          this.price_jisuan(1)
        }
        this.active = this.order.state_id - 2
        console.log(this.active)
      })
    },
    price_jisuan(price) {
      if (this.order.w_id == 1) this.yugu_price = 10 * 0.5
      if (this.order.w_id == 1) this.yugu_price = 10 * price
      else if (this.order.w_id == 2) this.yugu_price = 25 * price
      else if (this.order.w_id == 3) this.yugu_price = 50 * price
      else if (this.order.w_id == 4) this.yugu_price = 100 * price
    },
    // 修改状态
    insertState(state) {
      let params = `orderId=${this.order.order_id}&stateId=${state}`
      console.log(params)
      this.axios.post("/insertState", params).then((res) => {
        console.log("/insertState", res)
        if (state == 5) {
          let cmoney = this.order.collector_money + 3
          let cnum = this.order.collector_num + 1
          let umoney = this.order.money_amoun * 1 + this.yugu_price * 1
          let uintegral = this.order.integral + this.yugu_price
          let unum = this.order.recycle_count + 1

          let cid = this.order.collector_id
          let uid = this.order.client_id

          let a = `uintegral=${uintegral}&umoney=${umoney}&unum=${unum}&uid=${uid}&cmoney=${cmoney}&cnum=${cnum}&cid=${cid}`
          console.log(a)
          this.axios.post("/updateMoneyNum", a).then((res) => {
            console.log("/updateMoneyNum", res)

            let fangshi = this.order.sortChoice + this.order.w_range
            let url = `/tianjiashouru/回收${fangshi}/${this.yugu_price}/${uid}`
            console.log(url)
            this.axios.get(url).then((res) => {
              console.log("/tianjiashouru", res)
            })
          })
        }
        this.getOrder()
        this.$toast.success("修改成功")
      })
    },
  },
  mounted() {
    this.getOrder()
    this.windowHeight()
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
      var realVal =
        toFixedNum.substring(0, toFixedNum.toString().length - 1) + `￥`
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
.van-cell,
::v-deep .van-collapse-item__content,
::v-deep .van-cell__title {
  font-size: 0.7rem;
}
.btn {
  position: fixed;
  bottom: 0;
}
</style>
