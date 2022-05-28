<template>
  <div :style="{ height: h + 'px' }">
    <van-nav-bar title="登录" @click-left="onClickLeft" left-arrow>
    </van-nav-bar>
    <van-form @submit="onSubmit" :style="{ height: h - 46 + 'px' }">
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
        v-model="imgCode"
        name="imgCode"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      />
      <div class="yanzhengma">
        <div v-html="img" @click="refreshing"></div>
        <!-- <span>看不清? 点击刷新</span> -->
      </div>
      <router-link to="/register" :style="{ marginTop: h - 304 + 'px' }"
        >还没账号?点击此处注册加入我们吧</router-link
      >
      <van-button block type="primary" native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      img: "",
      imgCode: "",
      h: "",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
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
    // 提交
    onSubmit(values) {
      console.log(values)
      let params = `phone=${this.phone}&pwd=${this.password}`
      this.axios.post("/collectorLogin", params).then((res) => {
        console.log(res)
        if (values.imgCode == this.str) {
          if (res.data.code == 200) {
            this.$toast.success("登录成功")
            //调用mutations中的lognOk,修改vuex用户状态
            this.$store.commit("loginOK", res.data.result.collector_name)
            this.$store.commit("loginOKId", res.data.result.collector_id)
            this.$store.commit("loginOKPhone", res.data.result.collector_phone)
            this.$router.push("/")
          } else {
            //登录失败
            this.refreshing()
            this.imgCode = ""
            this.$toast.fail("账号密码输入错误")
          }
        } else {
          this.refreshing()
          this.imgCode = ""
          this.$toast.fail({
            message: "验证码错误,请重新输入",
          })
        }
      })
    },
    // 图片验证码
    refreshingYibu() {
      let params = ""
      return new Promise((resolve, reject) => {
        this.axios
          .get("/svg", params)
          .then((res) => {
            // console.log(res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    refreshing() {
      // console.log(this.$store.commit())
      this.refreshingYibu().then((res) => {
        this.str = res.data.str
        this.img = res.data.img
        console.log(this.str)
      })
    },
  },
  mounted() {
    this.refreshing()
    this.windowHeight()
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
// 验证码
.yanzhengma {
  margin: auto;
  div {
    // display: inline-block;
    margin: auto;
    text-align: center;
  }
  span {
    display: block;
    padding-bottom: 1rem;
  }
}
a {
  color: #646566;
  font-size: 0.5rem;
  display: block;
  text-align: center;
  margin-bottom: 0.7rem;
}
</style>
