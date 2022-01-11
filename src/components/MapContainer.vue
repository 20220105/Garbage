<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader"
export default {
  data() {
    return {
      map: null,
      lat: "", //维度
      lng: "", //经度
      address: "", //位置名称
    }
  },
  methods: {
    getGeoloc() {
      let geoloc = navigator.geolocation
      geoloc.getCurrentPosition(
        (msg) => {
          this.lat = msg.coords.latitude
          this.lng = msg.coords.longitude
          let lat = this.lat
          let lng = this.lng
          this.initMap(lat, lng)
        },
        (err) => {
          console.log(err)
        },
        { timeout: 5000 }
      )
    },

    initMap(lat, lng) {
      window._AMapSecurityConfig = {
        securityJsCode: "19c08b2b2bbd50e8b625891e4f4dffaf",
      }
      AMapLoader.load({
        key: "	0d61a266fffbc3fb374b7dcdcfc15cdd", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder", "AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          // console.log(lat, lng)
          // this.map = new AMap.Map("container", {
          //   //设置地图容器id
          //   viewMode: "3D", //是否为3D地图模式
          //   zoom: 18, //初始化地图级别
          //   center: [lng, lat], //初始化地图中心点位置
          // })

          var lnglat = [lng, lat]
          // console.log(lnglat)

          // 逆地理编码
          let coder = new AMap.Geocoder({ extensions: "all" })
          coder.getAddress(lnglat, (status, res) => {
            console.log(status, res)
            this.address = res.regeocode.formattedAddress
            this.$emit("myEvent", this.address)
          })
        })
        .catch((e) => {
          console.warn(e)
        })
    },
  },
  mounted() {
    this.getGeoloc()
    // this.initMap()
  },
}
</script>

<style lang="scss" scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
