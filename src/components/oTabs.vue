<template>
  <div>
    <van-tabs swipeable animated v-model="active" @click="onClick">
      <van-tab
        v-for="(item, index) in states"
        :key="index"
        :title="item.state_name"
        :name="index"
      >
        <!--  -->
        <van-swipe-cell v-for="(order, i) in orders" :key="i">
          <van-cell
            :border="false"
            :title="order.sortChoice + '/' + order.w_range"
            :value="`联系电话:${order.collector_phone}`"
          >
            <template #label>
              订单编号:A1452244&nbsp;&nbsp;{{ order.state_name }}</template
            >
          </van-cell>
          <template #right>
            <van-button square type="danger" text="取消订单" />
          </template>
        </van-swipe-cell>
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
  },
  mounted() {
    this.getState()
  },
  created() {},
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
</style>
