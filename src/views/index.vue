<template>
  <div>
    <!-- 头部标题导航栏部分 -->
    <van-nav-bar title="首页" @click-left="reload">
      <template #left>
        <van-icon name="location-o" size="1.05rem" color="#fff" />
        <span v-if="address">{{ address }}</span>
        <span v-else><template v-if="isRouterAlive">未定位</template></span>
      </template>
    </van-nav-bar>
    <!-- 定位部分 -->
    <map-container @myEvent="getAddress" class="map" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 回收指南等 -->
    <van-notice-bar
      left-icon="volume-o"
      text="回收流程通知"
      background="#fff"
      color="#25c89b"
    />
    <van-grid :border="false" :column-num="5">
      <van-grid-item to="/recyclingGuide">
        <van-icon name="browsing-history" size="2.3rem" color="#7d71f0" />
        <span>回收指南</span>
      </van-grid-item>
      <van-uploader :after-read="afterRead">
        <van-grid-item>
          <van-icon name="photograph" size="2.3rem" color="#666" />
          <span>拍照识别</span>
        </van-grid-item>
      </van-uploader>
      <van-grid-item to="/homepage">
        <van-icon name="shop" size="2.3rem" color="#fac43a" />
        <span>环保商城</span>
      </van-grid-item>
      <van-grid-item to="/the_order">
        <van-icon name="balance-list" size="2.3rem" color="#75e7a2" />
        <span>预约订单</span>
      </van-grid-item>
      <van-grid-item to="/rankingList">
        <van-icon name="graphic" size="2.3rem" color="#5ab2f3" />
        <span>榜单</span>
      </van-grid-item>
    </van-grid>
    <div>
      <!-- 搜索垃圾类别 -->
      <div class="lajifenlei" @click="into_garbage">
        <h2>垃圾分类查询</h2>
        <h4>点击搜一搜,垃圾分类更简单</h4>
        <van-icon name="search" size="36" color="#fff" />
      </div>
      <div class="e-r">
        <!-- 环保金 -->
        <div class="eco-gold">
          <van-notice-bar
            left-icon="gold-coin"
            text="我的环保金"
            background="#fff"
            color="#25c89b"
          />
          <van-grid :border="false" :column-num="3">
            <van-grid-item>
              <h1 style="color: #25c89b">
                {{ money.money_amoun | xiaoshudian }}
              </h1>
              <span>环保金额</span>
            </van-grid-item>
            <van-grid-item>
              <h1>{{ money.recycle_count }}</h1>
              <span>回收次数</span>
            </van-grid-item>
            <van-grid-item>
              <h1>{{ money.integral }}</h1>
              <span>积分</span>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 流程 -->
        <div class="recycling-process">
          <van-notice-bar
            left-icon="setting"
            text="回收流程"
            background="#fff"
            color="#25c89b"
          />
          <van-grid :border="false" :column-num="4">
            <van-grid-item>
              <van-icon name="map-marked" size="2.3rem" color="#75e7a2" />
              <span>授权定位</span>
            </van-grid-item>
            <van-grid-item>
              <van-icon name="bell" size="2.3rem" color="#75e7a2" />
              <span>一键预约</span>
            </van-grid-item>
            <van-grid-item>
              <van-icon name="live" size="2.3rem" color="#75e7a2" />
              <span>等待上门</span>
            </van-grid-item>
            <van-grid-item>
              <van-icon name="enlarge" size="2.3rem" color="#75e7a2" />
              <span>扫码收钱</span>
            </van-grid-item>
          </van-grid>
          <!-- 小箭头 -->
          <div class="next">
            <van-icon name="arrow" size="1.5rem" color="#666" />
            <van-icon name="arrow" size="1.5rem" color="#666" />
            <van-icon name="arrow" size="1.5rem" color="#666" />
          </div>
        </div>
      </div>
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
      <van-tabbar-item replace to="/homepage" icon="shop">商城</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 垃圾识别之后的弹出层 -->
    <!-- 弹出层 -->
    <van-popup v-model="show" closeable>
      <div class="ljfl-tcc">
        <img :src="url" alt="" />
        <span>垃圾:{{ garbage_lj.Rubbish }}</span>
        <span>垃圾类别:{{ garbage_lj.Category }}</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import MapContainer from "../components/MapContainer.vue"
import { client } from "../utils/alioss"
export default {
  components: { MapContainer },
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      show: false,
      active: 0,
      address: "", //地理位置名称
      // 轮播图图片
      images: [
        "/rubbish_img/1.jpg",
        "/rubbish_img/2.jpg",
        "/rubbish_img/3.jpg",
        "/rubbish_img/4.jpg",
        "/rubbish_img/5.jpg",
      ],
      isRouterAlive: true, //用来局部刷新
      url: "", //拍照后传递的url参数
      garbage_lj: "", //拍照后传回来得垃圾数据
      money: {
        money_amoun: 0,
        integral: 0,
        recycle_count: 0,
      },
    }
  },
  methods: {
    into_garbage() {
      this.$router.push("/garbage")
    },
    getAddress(val) {
      this.address = val
      console.log(val)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    afterRead(file) {
      this.$toast.loading({
        message: "识别中...",
        forbidClick: true,
      })
      // 此时可以自行将文件上传至服务器
      file.status = "uploading"
      file.message = "上传中..."
      let len = len || 32
      var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
      var maxPos = $chars.length
      var pwd = ""
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos)) // 生成32位随机字符
      }
      let name = file.file.name
      var pos = name.indexOf(".")
      let type = name.substr(pos)
      var fileName = `${Date.parse(new Date())}` + pwd + type // 文件名称（时间戳+随机字符+后缀）
      client()
        .multipartUpload(fileName, file.file)
        .then((res) => {
          this.url = res.res.requestUrls[0].split("?")[0]
          // console.log("res", res.res.requestUrls[0])
          console.log("url", this.url)
          let imageUrlObj = {}
          imageUrlObj.fileName = res.res.requestUrls[0]
          imageUrlObj.fileUrl = res.res.requestUrls[0]
          imageUrlObj.fileType = 1
          imageUrlObj.type = 1
          this.imageUrlIdCard = imageUrlObj
          // this.submitFile() //调后端接口，将oss返回的数据传给后端存储倒库
          file.status = ""
          file.message = ""
          let params = `imgUrl=${this.url}`
          console.log(params)
          this.axios.post("/gcs", params).then((res) => {
            // console.log(res)
            if (res.data.code != 200) {
              this.$toast.fail("抱歉!识别失败!我们正在努力学习中!")
            } else {
              this.garbage_lj = res.data.results.Data.Elements[0]
              // console.log(this.garbage_lj)
              this.show = true
            }
          })
        })
        .catch((err) => {
          console.warn(err)
        })
      console.log(file)
    },
    getuser() {
      let id = sessionStorage.getItem("id")
      if (id == null) return
      this.userId = id
      let url = `/money_amoun/${id}`
      this.axios.get(url).then((res) => {
        this.money = res.data.results[0]
      })
    },
  },
  mounted() {
    this.getuser()
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
//定位文字样式
::v-deep .van-nav-bar__left {
  text-align: left;
  color: #fff;
  width: 8rem;
  height: 1.5rem;
  overflow: hidden;
  top: 0.85rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.map {
  display: none;
}
.my-swipe .van-swipe-item {
  margin-top: 0.2rem;
  img {
    width: 100%;
    border-radius: 1.1rem;
  }
}
.van-grid-item__content--center {
  span {
    font-size: 0.8rem;
  }
}
.lajifenlei {
  position: relative;
  width: 100vw;
  height: 5rem;
  background-color: #25c89b;
  border-radius: 3.5rem;
  margin-bottom: 0.5rem;
  h2,
  h4 {
    text-align: center;
    margin: 0;
    color: #fff;
  }
  h2 {
    padding-top: 0.55rem;
  }
  i {
    position: absolute;
    top: 1.3rem;
    left: 2.5rem;
    font-weight: 900;
  }
}
.e-r {
  background-color: rgb(243, 242, 242);
  width: 100%;
  padding: 0.2rem 0;
  .eco-gold,
  .recycling-process {
    width: 100%;
    height: 8.8rem;
    margin: 0.5rem 0;
  }
  .recycling-process {
    position: relative;
    .van-grid-item__content--center {
      span {
        margin-top: 0.95rem;
      }
    }
    .next {
      height: 0;
      margin-left: 3.5rem;
      position: relative;
      background-color: rgb(243, 242, 242);
      > .van-icon {
        margin: 0 2rem;
        bottom: 4.8rem;
      }
    }
  }
}
.van-grid-item__content--center > h1 {
  font-weight: 300;
  margin: 0 0 1.3rem 0;
  font-size: 1.5rem;
}
// 底部导航栏
::v-deep .bottom_nav {
  .van-icon {
    font-size: 1.65rem;
  }
}

// 弹出层样式
.van-popup--center {
  border-radius: 1.5rem;
}
.ljfl-tcc {
  width: 70vw;
  text-align: center;
  img {
    display: block;
    margin: auto;
    margin-top: 0.9rem;
    width: 90%;
    border-radius: 1.5rem;
  }
  span {
    display: block;
    margin: 0.7rem 0;
  }
}
.van-button--large {
  width: 90%;
  display: block;
  margin: auto;
  margin-bottom: 0.5rem;
}
</style>
