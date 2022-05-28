<template>
  <div>
    <van-nav-bar title="订单列表" @click-left="showPopup">
      <template #left>
        <van-icon name="bars" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 左侧弹出层 -->
    <van-popup
      v-model="show"
      position="left"
      round
      :style="{ width: '85%', height: '100%', backgroundColor: '#f3f2f2' }"
    >
      <div class="tanchuceng">
        <div class="collector">
          你好,
          <span v-if="!$store.state.islogin"
            ><router-link to="/login">你未登录,点击去登录</router-link></span
          >
          <span v-else>{{ name }}</span>
          <van-icon name="arrow" />
        </div>
        <van-grid :column-num="2" style="margin-top: 0.7rem">
          <van-grid-item>
            <template #icon>
              <div style="font-size: 0.85rem">
                我的账户<van-icon name="arrow" />
              </div>
            </template>
            <template #text>
              <div style="margin: 0.3rem 0; font-size: 0.85rem">
                <span style="font-size: 1.3rem">{{
                  collector.collector_money | xiaoshudian
                }}</span
                >元
              </div>
              <div style="font-size: 0.3rem; color: #aaa">本月预计收入</div>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <div style="font-size: 0.85rem">
                订单统计<van-icon name="arrow" />
              </div>
            </template>
            <template #text>
              <div style="margin: 0.3rem 0; font-size: 0.85rem">
                <span style="font-size: 1.3rem">{{
                  collector.collector_num
                }}</span
                >单
              </div>
              <div style="font-size: 0.3rem; color: #aaa">完成单量</div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>

    <!-- 订单 -->
    <van-tabs v-model="active" animated @click="onClick">
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
              :value="`联系电话:${order.phone}`"
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
  data() {
    return {
      show: false,
      name: sessionStorage.getItem("name"),
      states: "",
      stateID: "",
      active: "",
      orders: "",
      collector: {
        collector_money: 0,
        collector_num: 0,
      },
    }
  },

  methods: {
    showPopup() {
      this.show = true
    },
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
      this.axios.post("/search_orders_collector", params).then((res) => {
        this.orders = res.data.results
        console.log(this.orders)
      })
    },
    onClick(name, title) {
      console.log(name, title)
      if (name == 0) {
        this.stateID = ""
      } else {
        this.stateID = name + 1
      }
      // console.log("stateID", this.stateID)
      let uid = sessionStorage.getItem("id")
      console.log(uid)
      let params = `uid=${uid}&stateId=${this.stateID}`
      this.axios.post("/search_orders_collector", params).then((res) => {
        this.orders = res.data.results
        console.log(this.orders)
      })
    },
    // 加载回收员单量及回收金额
    getCollector() {
      let cid = sessionStorage.getItem("id")
      if (!cid) return
      let params = `cid=${cid}`
      this.axios.post("/collectorMoneyNum", params).then((res) => {
        this.collector = res.data.results[0]
        console.log(this.collector)
      })
    },
  },
  mounted() {
    this.getState()
    this.getCollector()
  },
  filters: {
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
a {
  color: #25c89b;
}
.tanchuceng {
  margin: 0.7rem;
}
</style>
