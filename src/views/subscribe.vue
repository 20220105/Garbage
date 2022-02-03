<template>
  <div class="container">
    <!-- <custom-navbar title="回收预约"></custom-navbar> -->
    <van-nav-bar title="回收预约"></van-nav-bar>
    <div class="block">
      <div class="nav">
        <!-- 文字左侧图标 -->
        <div class="nav_icon">
          <div class="nav_icon2"></div>
          <div class="nav_icon1"></div>
        </div>
        <!-- 选择回收垃圾分类 -->
        <div class="nav_title">选择回收分类</div>
        <div class="nav_title nav_right">
          已选择：{{ recycleClass[currentRecycle].title }}
        </div>
      </div>
      <!-- 衣物 家电 塑料等图片文字 -->
      <div class="content" style="margin-left: -1rem; margin-top: -1rem">
        <div class="scroll-view">
          <!-- 在v-for时，给每个图片和下面的文字添加动态的样式 -->
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
              <van-image
                fit="contain"
                :src="item.img"
                with="100"
                hight="100"
              ></van-image>
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <van-divider></van-divider>
    <!-- 当前区域未开通 -->
    <div class="block" style="padding: 0 0.5rem">
      <div class="content">
        <!-- 如果在区域范围内 -->
        <div v-if="areaEnable">
          <div id="map1" class="map-box"></div>
        </div>
        <!-- v-else  -->
        <div class="area_unavailable_tip" v-else style="margin-top: 1.5rem">
          当前区域未开通
        </div>
      </div>
    </div>
    <van-divider></van-divider>
    <!-- 预估重量 -->
    <div class="block" style="padding: 0 1rem 0 1rem">
      <div class="nav">
        <div class="nav_icon">
          <!-- 文字左侧图标 -->
          <div class="nav_icon2"></div>
          <div class="nav_icon1"></div>
        </div>
        <div class="nav_title">预估重量</div>
      </div>
      <div class="content">
        <!-- 重量范围 -->
        <div class="grid">
          <WeightRange
            class="item"
            @click.native="selectWeight(index)"
            v-for="(item, index) in estimateWeight"
            :key="index"
            :checked="currentEstimateWeight === index"
          >
            {{ item.range }}
          </WeightRange>
        </div>
        <!-- 注意事项 -->
        <div class="item">
          <van-icon
            name="warning"
            color="#FFA555"
            size="19px"
            class="item_icon"
          ></van-icon>
          <div class="title">注意事项：小于10公斤暂不保证上门回收</div>
        </div>
      </div>
      <van-divider></van-divider>
      <!-- 上门时间 -->
      <div class="block" style="padding: 0 1rem 0 1rem">
        <div class="content">
          <div class="item">
            <van-icon
              name="clock"
              color="#C0C0C0"
              size="19px"
              class="item_icon"
            ></van-icon>
            <div class="title">上门时间</div>
            <div class="flex_title">
              <div
                :class="{ content: true, active: servicetime != '' }"
                @click="timePickerShow = true"
              >
                <!-- 服务时间是否为空,非空添加服务时间 -->
                {{ servicetime != "" ? formattime : "请选择上门时间" }}
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
                <!-- 客户选择预约时间  在vant组件的基础上通过传入filter函数,对选项数组进行过滤 -->
                <van-datetime-picker
                  style="position: absolute; width: 98%; left: 0; bottom: 0"
                  show-toolbar
                  type="datehour"
                  v-model="servicetime"
                  @confirm="timePickerChange"
                  :min-date="now"
                  :filter="filter"
                  @cancel="timePickerShow = false"
                />
              </div>
              <van-icon name="arrow" color="#c0c0c0" size="16px"></van-icon>
            </div>
          </div>
          <!-- <van-divider></van-divider> -->
          <!-- 预约地址 -->
          <div class="item">
            <van-icon
              name="location"
              color="#C0C0C0"
              size="19px"
              class="item_icon"
            ></van-icon>
            <div class="title">预约地址</div>
            <div class="flex_title">
              <div
                :class="{ content: true, active: currentAddress != '' }"
                @click="changeAddress"
              >
                <!-- 三目运算符 -->
                {{ currentAddress != "" ? currentAddress : "请选择预约地址" }}
              </div>
              <van-icon name="arrow" color="#c0c0c0" size="16px"></van-icon>
            </div>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <van-divider></van-divider>
      <!-- 预估备注 -->
      <div class="block" style="padding: 0 1rem 0 1rem">
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
      <!-- 预约下单代表您已同意....跳转至 免责条款页 -->
      <div class="footer">
        <div class="clause">
          预约下单代表您已同意<router-link to="/disclaimers" class="link"
            >《免责条款》</router-link
          >
        </div>
        <!-- 无法预约按钮 -->
        <van-button
          :type="allowSubmit ? 'primary' : 'default'"
          round
          size="large"
          :disabled="!allowSubmit"
          style="height: 50px"
          @click="lijiYuyue"
        >
          {{ allowSubmit ? "立即预约" : "无法预约" }}
        </van-button>
      </div>
      <!-- 底部导航栏 -->
      <van-tabbar
        class="bottom_nav"
        :placeholder="true"
        :safe-area-inset-bottom="true"
        active-color="#25c89b"
        inactive-color="#9D9D9D"
        v-model="active"
      >
        <van-tabbar-item replace to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item replace to="/the_order" icon="column"
          >订单</van-tabbar-item
        >
        <van-tabbar-item replace to="/subscribe" icon="bell"
          >一键预约</van-tabbar-item
        >
        <van-tabbar-item replace to="/homepage" icon="shop"
          >商城</van-tabbar-item
        >
        <van-tabbar-item replace to="/me" icon="manager">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
// 所需地图key
import { WebServiceKey, JsApiKey } from "../utils/map.config"
// 预估重量
import WeightRange from "../components/WeightRange"
// JS API结合Vue使用
import AMapLoader from "@amap/amap-jsapi-loader"
import moment from "moment"
export default {
  components: {
    WeightRange,
  },
  data() {
    return {
      active: 2,
      map: null,
      areaEnable: false, //当前区域是否开通
      comment: "", //备注 双向绑定
      allowSubmit: false, //是否允许提交 用于控制立即预约按钮样式和可用性(disabled)
      // 预估重量
      estimateWeight: [
        {
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
      timePickerShow: false, //是否显示时间选择器
      servicetime: "", //上门时间
      // 选择回收分类
      recycleClass: [
        {
          id: 0,
          title: "衣物",
          img: "https://img10.360buyimg.com/focus/s140x140_jfs/t18343/191/641645855/3307/d3a4e7b4/5a9fb694N13609fcd.jpg",
        },
        {
          id: 1,
          title: "家电类",
          img: "https://img13.360buyimg.com/focus/s140x140_jfs/t13069/193/944900508/2525/d7c9efc/5a17f21dN905aaf4c.jpg",
        },
        {
          id: 2,
          title: "塑料类",
          img: "https://img12.360buyimg.com/focus/s140x140_jfs/t19381/31/2616382291/12312/d7bfab0e/5b02a113Na7a0c350.jpg",
        },
        {
          id: 4,
          title: "金属类",
          img: "https://img12.360buyimg.com/focus/s140x140_jfs/t1/22027/26/6496/8632/5c528d99E58074f4d/d2223703de1f0d6f.jpg",
        },
        {
          id: 4,
          title: "纸类",
          img: "https://img14.360buyimg.com/n2/s270x270_jfs/t3220/165/2169743523/483163/d42fbd80/57de1d64Nd9a4bfeb.jpg!q70.dpg",
        },
      ],
      currentRecycle: 0, //当前选择的回收分类,
      currentAddress: "", //当前填写的地址
      currentGeo: [], //当前填写的地址转换为经纬度,
      now: null, //时间选择器用的，用于初始化时间选择器的最小时间
      temp: "",
      collectorUsers: "",
      collectorUsersId: "",
    }
  },
  mounted() {
    this.huishouyuan()
    this.now = new Date()
    if (this.currentAddr) {
    } //不要删除这行，会出bug
  },

  methods: {
    //
    huishouyuan() {
      // 加载回收员
      this.axios.post("/collectorUsers").then((res) => {
        // console.log(res)
        this.collectorUsers = res.data.results
        let IDs = []
        for (const i in this.collectorUsers) {
          IDs.push(Number(this.collectorUsers[i].collector_id))
        }
        this.collectorUsersId = IDs
        let collectorUserID = IDs[Math.floor(Math.random() * IDs.length)]
        this.collectorUsersId = collectorUserID
        // console.log("回收员id", this.collectorUsersId)
      })
    },
    lijiYuyue() {
      // console.log(collectorUserID)
      // console.log("类别", this.currentRecycle + 1)
      // console.log("重量id", this.currentEstimateWeight + 1)
      // console.log("上门时间", this.servicetime)
      // console.log("地址", this.temp)
      // console.log("备注", this.comment)
      // console.log("回收员", this.collectorUsersId)

      var outTradeNo = "" //订单号
      for (var i = 0; i < 5; i++) {
        //6位随机数，用以加在时间戳后面。
        outTradeNo += Math.floor(Math.random() * 10)
      }
      // 订单号首字母
      let arr = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ]
      let idvalue = arr[Math.floor(Math.random() * 52)]
      outTradeNo = idvalue + new Date().getTime() + outTradeNo //时间戳，用来生成订单号。
      // console.log('订单号',outTradeNo)

      // 预约时间处理
      let date = moment(this.servicetime).format("YYYY-MM-DD HH:mm:ss")

      console.log("temp", this.temp)

      // 预约添加数据
      let params = `orderNum=${outTradeNo}
      &uid=${sessionStorage.getItem("id")}
      &collectorId=${this.collectorUsersId}
      &orderCompleteTime=${date}
      &wId=${this.currentEstimateWeight + 1}
      &sortChoiceId=${this.currentRecycle + 1}
      &address=${this.temp.address}
      &addressId=${this.temp.id}
      &note=${this.comment}`

      // console.log(params)
      this.axios.post("/EditOrder", params).then((res) => {
        console.log(res)
        this.$toast.success("预约订单成功")
        this.$router.push({
          path: "/orderDetails",
          query: { orderID: res.data.results.insertId },
        })
      })
    },
    initMap() {
      AMapLoader.load({
        key: JsApiKey,
        version: "1.4.15", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("map1", {
            //设置地图容器id
            viewMode: "2D",
            zoom: 17, //初始化地图级别
            center: this.currentGeo, //初始化地图中心点位置
          })

          //创建marke
          let marker = new AMap.Marker({
            position: new AMap.LngLat(...this.currentGeo),
          })
          // 将创建的点标记添加到已有的地图实例：
          this.map.add(marker)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    destoryMap() {
      if (this.map != null) {
        this.map.destroy()
      }
    },
    recycleChange(id) {
      //设置选中的回收分类
      this.currentRecycle = id
    },
    timePickerChange(e) {
      //切换时间选择器打开状态
      this.timePickerShow = false
    },
    filter(type, options) {
      //时间选择器时间范围过滤
      let now = new Date()
      if (type === "year") {
        return options.filter((option) => option < now.getFullYear() + 1)
      } else if (type === "hour") {
        return options.filter(
          (option) =>
            Number.parseInt(option) >= 8 && Number.parseInt(option) <= 20
        )
      } else if (type === "day") {
        let day = now.getDate()
        let hour = now.getHours()
        return options.filter(
          (option) => (hour >= 20 && option != day) || hour < 20
        )
      }
      return options
    },
    selectWeight(id) {
      //选择重量范围
      this.currentEstimateWeight = id
    },
    changeAddress() {
      //点击修改地址按钮
      this.$router.push("/recyclingadd")
    },
  },

  watch: {
    async currentAddress(val) {
      //异步方法，地名转经纬度
      try {
        let res = await this.axios.get(
          "https://restapi.amap.com/v3/geocode/geo?parameters",
          {
            params: {
              key: WebServiceKey, //高德Web服务Key
              address: val,
            },
          }
        )
        this.currentGeo = res.data.geocodes[0].location.trim().split(",")
      } catch (e) {} //防止数据出错
    },
    currentGeo(val) {
      //通过监听经纬度数组的长度，切换“当前是否在可用区域内”
      if (val.length === 2) {
        this.areaEnable = true
        this.allowSubmit = true
        this.initMap()
      } else {
        this.areaEnable = false
        this.allowSubmit = false
        this.destoryMap()
      }
    },
  },
  computed: {
    formattime() {
      //格式化日期，仅用于显示，实际提交表单应提交 this.servicetime
      let time = new Date(this.servicetime)
      return (
        time.getFullYear() +
        "年" +
        (time.getMonth() + 1) +
        "月" +
        time.getDate() +
        "日 " +
        time.getHours() +
        ":00"
      )
    },
    currentAddr() {
      // console.log("a", this.$store.state.address)
      if (this.$store.state.address.currentSelectId === "-1") {
        let params = `uid=${sessionStorage.getItem("id")}`
        this.axios.post("/morenAddress", params).then((res) => {
          // console.log(res)
          let list = res.data.result
          let temp = {
            id: list.address_id,
            tel: list.phone,
            name: list.name,
            address: list.address_text,
            isDefault: list.ismoren,
            addressDetail: list.address_text,
            areaCode: list.areaCode,
            city: "",
            county: "",
            postalCode: list.areaCode,
            province: "",
          }
          this.temp = temp
          console.log("temp", this.temp)
          let addr =
            temp.province + temp.city + temp.county + temp.addressDetail
          this.currentAddress = addr
        })
      } else {
        let temp = this.$store.state.address.currentSelectId
        this.temp = temp
        console.log("temp", this.temp)
        let addr = temp.province + temp.city + temp.county + temp.addressDetail
        // console.log(addr)
        this.currentAddress = addr
        return addr
      }
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
// 地图大小
.map-box {
  width: 100%;
  height: 8rem;
}
.navbar {
  height: 1.28rem;
  width: 100vw;
  background-color: #fff;
  position: relative;
}
// 回收预约  页头
.navbar > div {
  height: 2.28rem;
  width: 100%;
  background-color: #fff;
  border-bottom: 0.0133rem solid #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.container {
  width: 100vw;
  height: auto;
  padding-bottom: 1.0667rem;
  position: relative;
}
.block {
  width: 98%;
  height: auto;
  background-color: #ffffff;
  padding: 1.5rem 1rem 0 1.5rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}
.nav {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.9rem;
}
.nav > .nav_icon {
  height: 100%;
  margin-right: 0.5rem;
  width: 0.4rem;
  position: relative;
}
.nav > .nav_icon > .nav_icon1 {
  background-color: #23bd6d;
  position: absolute;
  top: 0.1rem;
  width: 0.3rem;
  height: 0.8rem;
  border-radius: 2.799rem 0 0.0933rem 0;
}
.nav > .nav_icon > .nav_icon2 {
  background-color: #ffdf95;
  position: absolute;
  left: 50%;
  bottom: -0.12rem;
  width: 0.3rem;
  height: 0.8rem;
  border-radius: 2.799rem 0 2.799rem 0;
}
.nav > .nav_title {
  font-weight: 600;
  font-size: 0.3733rem;
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
  // padding: 0.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.3467rem;
  font-weight: 600;
}
.block > .content > .item > .item_icon {
  margin-right: 0.2667rem;
}
.block > .content > .item > .title {
  min-width: 1.8667rem;
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
  font-size: 0.3467rem;
}
.block > .content > .item > .flex_title .content.active {
  color: #000;
}
.area_unavailable_tip {
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.3467rem;
  margin-bottom: 1.5rem;
}
#comment {
  font-size: 0.3467rem;
  border: none;
}
.footer {
  display: flex;
  flex-direction: column;
  padding: 0 1.0667rem;
}
// 预约下单代表已同意免责
.footer > .clause {
  width: 100%;
  text-align: center;
  margin: 0.4rem 0;
  font-size: 0.3467rem;
  color: #a0a0a0;
}
.footer > .clause > .link {
  color: #25c90b;
  display: inline;
}
.grid {
  width: 100%;
  // margin-top: 1rem;
}
.grid > .item {
  display: inline-block;
  width: calc(50% - 0.2rem); //使负外边距移动自身距离高与宽的一半
  box-sizing: border-box;
  margin-bottom: 0.3rem;
}
// 每一个item的偶数同级元素
.grid > .item:nth-of-type(odd) {
  margin-right: 0.2rem;
}
// 每一个item的奇数同级元素
.grid > .item:nth-of-type(even) {
  margin-left: 0.2rem;
}
.scroll-view {
  margin-top: 1.1333rem;
  height: 5.6667rem;
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
  font-size: 0.3467rem;
  height: 100%;
  vertical-align: top;
  width: 6rem;
}
.scroll-item-img {
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  border: 0.08rem solid #ffffff;
}
.scroll-item-img.scroll-item-img-selected {
  border: 0.1rem solid #25c90b;
}
.scroll-item-img > image {
  width: 100%;
  height: 100%;
}
div.title {
  margin: 1rem 1rem;
}
.van-divider--hairline::after,
.van-divider--hairline::before {
  transform: scaleY(3.5);
}
// 底部导航栏
::v-deep .bottom_nav {
  .van-icon {
    font-size: 1.65rem;
  }
}
</style>
