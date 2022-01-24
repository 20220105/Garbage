<template>
  <div style="background-color: #f3f2f2">
    <!-- 标题栏 -->
    <van-nav-bar title="我的"></van-nav-bar>

    <div class="head_money">
      <div class="ss">
        <router-link
          to="/login"
          class="click_login"
          v-if="!$store.state.islogin"
        >
          <van-image
            round
            width="5rem"
            height="5rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
          />
        </router-link>
        <router-link
          to="/login"
          class="click_login"
          v-if="$store.state.islogin"
        >
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="$store.state.url"
            fit="cover"
          />
        </router-link>
      </div>
      <router-link to="/login" class="click_login" v-if="!$store.state.islogin"
        >点击登录</router-link
      >
      <div v-if="$store.state.islogin" class="hic">
        <span class="islogin">{{ $store.state.nickname }}</span>
        <div>
          <span class="client_id">ID:{{ userId }}</span>
        </div>
      </div>
      <!-- 环保金 -->
      <div class="eco-gold">
        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <h1>{{ money.money_amoun }}</h1>
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
    </div>
    <div class="body">
      <van-grid direction="horizontal" :column-num="2" class="tixianMingxi">
        <van-grid-item icon="balance-list-o" text="收入明细" class="shouru" />
        <van-grid-item icon="after-sale" text="去提现" class="tixian" />
      </van-grid>
      <div class="recycling-process">
        <van-notice-bar
          left-icon="column"
          text="回收订单"
          background="#fff"
          color="#25c89b"
        />
        <van-grid :border="false" :column-num="4">
          <van-grid-item class="left">
            <van-icon name="todo-list" size="2.3rem" color="#75e7a2" />
            <span>全部预约</span>
          </van-grid-item>
          <van-grid-item>
            <van-icon name="smile-comment" size="2.3rem" color="#75e7a2" />
            <span>待服务</span>
          </van-grid-item>
          <van-grid-item>
            <van-icon name="clock" size="2.3rem" color="#75e7a2" />
            <span>已称重</span>
          </van-grid-item>
          <van-grid-item class="right">
            <van-icon name="clear" size="2.3rem" color="#75e7a2" />
            <span>已取消</span>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recycling-process">
        <van-notice-bar
          left-icon="setting"
          text="常用工具"
          background="#fff"
          color="#25c89b"
        />
        <van-grid :border="false" :column-num="4">
          <van-grid-item to="/rankingList">
            <van-icon name="medal-o" size="2.3rem" color="#75e7a2" />
            <span>回收榜单</span>
          </van-grid-item>
          <van-grid-item to="/recyclingGuide">
            <van-icon name="newspaper-o" size="2.3rem" color="#75e7a2" />
            <span>回收指南</span>
          </van-grid-item>
          <van-grid-item>
            <van-icon
              name="share-o"
              size="2.3rem"
              color="#75e7a2"
              @click="showShare = true"
            />
            <span>邀请有礼</span>
          </van-grid-item>
          <van-grid-item to="/invitationList">
            <van-icon name="orders-o" size="2.3rem" color="#75e7a2" />
            <span>邀请列表</span>
          </van-grid-item>
          <van-grid-item class="left" to="/feedback">
            <van-icon name="envelop-o" size="2.3rem" color="#75e7a2" />
            <span>意见反馈</span>
          </van-grid-item>
          <van-grid-item to="/customerService">
            <van-icon name="service-o" size="2.3rem" color="#75e7a2" />
            <span>客服</span>
          </van-grid-item>
          <van-grid-item to="/recyclingadd">
            <van-icon name="location-o" size="2.3rem" color="#75e7a2" />
            <span>回收地址</span>
          </van-grid-item>
          <van-grid-item class="right">
            <van-icon name="" size="2.3rem" color="#75e7a2" />
            <span></span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      data-clipboard-action="copy"
      data-clipboard-target="#link"
    />

    <span
      class="text_link"
      type="text"
      id="link"
      :value="url"
      ref="link"
      style="display: none"
      >{{ url }}</span
    >
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
  </div>
</template>

<script>
import Clipboard from "clipboard"
export default {
  data() {
    return {
      active: 4,
      selected: "main",
      loading: false,
      isLogin: false,
      money: {
        money_amoun: 0,
        integral: 0,
        recycle_count: 0,
      },
      userId: "",
      // 分享
      showShare: false,
      // 分享
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        {
          name: "复制链接",
          icon: "link",
          className: "copy",
        },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      isShow: false,
      word: "复制成功!去分享",
      url: "",
    }
  },
  // 实例创建后,进行默认数据处理
  created() {
    this.url = `http://${location.hostname}:${location.port}/`
    console.log(this.url)
  },
  methods: {
    // isLogin() {
    //   // this.$store.commit("loginOK")
    //   let a = sessionStorage.getItem("id")
    // },
    getuser() {
      let id = sessionStorage.getItem("id")
      this.userId = id
      let url = `/money_amoun/${id}`
      this.axios.get(url).then((res) => {
        this.money = res.data.results[0]
        console.log(this.money)
      })
    },
    // 分享  复制链接
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
      if (option.name == "复制链接") {
        let container = this.$refs.container
        this.$copyText(this.url, container)
        this.$toast(this.word)
      }
    },
  },
  mounted() {
    // this.isLogin()
    this.getuser()
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
// 头加金额
.head_money {
  background-color: #25c89b;
  padding-top: 1rem;
}
// 头像部分样式
.ss {
  width: 100%;
  text-align: center;
}
.van-tabbar-item {
  color: #fff;
}
.click_login,
.islogin {
  width: 100%;
  color: #fff;
  display: inline-block;
  text-align: center;
}
.van-cell__title > span,
.islogin,
span {
  color: #fff;
}
::v-deep .hic > :nth-child(2) {
  background-color: #21b48b;
  font-size: 0.3rem;
  display: block !important;
  width: 5rem;
  margin: auto;
  text-align: center;
  padding: 0.2rem 0;
  border-radius: 1rem;
}
//
.body {
  margin: 0 0 0.5rem 0;
  position: relative;
  bottom: 2rem;
}
// 环保金额
.eco-gold {
  h1 {
    font-size: 1rem;
    color: #fff;
    font-weight: 300;
  }
  ::v-deep .van-grid-item__content--center {
    background-color: #25c89b;
    padding-bottom: 4rem;
  }
}
// 提现明细
// .aaa {
//   width: 100vw;
// }
.recycling-process,
.tixianMingxi {
  // background-color: red;
  width: 95%;
  margin: auto;
  // position: absolute;
  // overflow: hidden;
  // top: 18.5rem;
  // left: 0.3rem;
}
.recycling-process {
  margin-top: 0.5rem;
  span {
    color: black;
  }
  .van-notice-bar {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .left {
    ::v-deep .van-grid-item__content--center {
      border-radius: 0 0 0 0.5rem;
    }
  }
  .right {
    ::v-deep .van-grid-item__content--center {
      border-radius: 0 0 0.5rem 0;
    }
  }
}
.shouru > ::v-deep div {
  border-radius: 0.5rem 0 0 0.5rem;
}
.tixian > ::v-deep div {
  border-radius: 0 0.5rem 0.5rem 0;
}
.van-grid {
  // width: 95%;
  // margin: auto;
  ::v-deep
    .van-grid-item__content--horizontal
    .van-grid-item__icon
    + .van-grid-item__text {
    font-size: 1rem;
    color: black;
  }
}

// 底部导航栏
::v-deep .bottom_nav {
  .van-icon {
    font-size: 1.65rem;
  }
}
</style>
