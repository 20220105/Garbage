<template>
  <div>
    <van-tabs animated v-model="active" @click="onClick">
      <van-tab
        v-for="(item, index) in states"
        :key="index"
        :title="item.state_name"
        :name="index"
      >
        <!--  -->
        <template v-if="orders.length != 0">
          <van-swipe-cell v-for="(order, i) in orders" :key="i">
            <van-cell
              :border="false"
              :title="order.sortChoice + '/' + order.w_range"
              :value="`联系电话:${order.collector_phone}`"
              :to="{
                path: '/orderDetails',
                query: { orderID: order.order_id },
              }"
            >
              <template #label>
                {{ order.order_num }}&nbsp;&nbsp;{{
                  order.state_name
                }}</template
              >
            </van-cell>
            <template #right v-if="order.state_id * 1 != 7">
              <van-button
                square
                type="danger"
                text="取消订单"
                @click="cancelOrder(order.order_id, order.state_name)"
              />
            </template>
            <template #right v-else>
              <van-button disabled square type="danger" text="已取消订单" />
            </template>
          </van-swipe-cell>
        </template>
        <div v-else-if="orders.length == 0">
          <van-empty description="暂无订单" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: ["StateActive"],
  data() {
    return {
      states: "",
      stateID: "",
      active: "",
      orders: "",
    }
  },
  methods: {
    getState() {
      let uid = sessionStorage.getItem("id")
      // console.log("uid", uid)
      if (this.StateActive == undefined || this.StateActive == 0) {
        this.active = 0
        this.stateID = ""
      } else {
        this.active = this.StateActive * 1
        this.stateID = this.active + 1
      }
      // console.log("状态参数", this.StateActive)
      // console.log("是否修改值", this.active)
      this.axios.get("/getState").then((res) => {
        this.states = res.data.results
        // console.log(this.states)
      })

      let params = `uid=${uid}&stateId=${this.stateID}`
      this.axios.post("/search_orders", params).then((res) => {
        this.orders = res.data.results
        // console.log(this.orders)
      })
    },
    onClick(name, title) {
      // console.log(name, title)
      if (name == 0) {
        this.stateID = ""
      } else {
        this.stateID = name + 1
      }
      // console.log("stateID", this.stateID)
      let uid = sessionStorage.getItem("id")
      let params = `uid=${uid}&stateId=${this.stateID}`
      this.axios.post("/search_orders", params).then((res) => {
        this.orders = res.data.results
        // console.log(this.orders)
      })
    },
    cancelOrder(val, state) {
      this.$dialog
        .confirm({
          title: "取消订单",
          message: `该订单${state},是否确认取消订单,如操作失误请点击取消`,
        })
        .then(() => {
          // console.log(val)
          let url = `/cancelOrder/${val}`
          this.axios.get(url).then((res) => {
            this.$toast.success("已取消订单")
            this.onClick(this.stateID - 1)
          })
        })
        .catch(() => {
          this.$toast("已取消该操作")
        })
    },
  },
  mounted() {
    this.getState()
  },
}
</script>

<style scoped>
::v-deep .van-empty__image img {
  height: 14rem;
  margin-top: 5rem;
}
::v-deep .van-tabs__line {
  background-color: #25c89b;
}
::v-deep .van-empty__description {
  margin-top: 8em;
}
::v-deep .van-empty__image img {
  height: 100% !important;
}
</style>
