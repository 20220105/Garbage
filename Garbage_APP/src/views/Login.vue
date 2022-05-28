<template>
  <div>
    <!--标题栏-->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <router-link to="/register">新用户</router-link>
      </template>
    </van-nav-bar>
    <van-field
      type="text"
      v-model="name"
      placeholder="请输入用户名"
      label="用户名"
      @blur.native.capture="checkName"
      :right-icon="nameState"
    />
    <van-field
      type="password"
      placeholder="请输入密码"
      label="密码"
      @blur.native.capture="checkPwd"
      v-model="pwd"
      :right-icon="pwdState"
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
    <van-button @click="checkForm" type="primary" size="large">登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "", //绑定用户名文本框输入的内容
      nameState: "", //绑定用户名文本框的状态
      pwd: "",
      pwdState: "",
      img: "",
      imgCode: "",
    }
  },
  methods: {
    checkName() {
      //绑定用户名文本框
      let reg = /^\w{6,15}/
      if (reg.test(this.name)) {
        //验证成功
        this.nameState = "smile-o"
        return true
      } else {
        //验证失败
        this.nameState = "warning-o"
        return false
      }
    },
    checkPwd() {
      //密码要求6位数字
      let reg = /^\w{6,15}/
      if (reg.test(this.pwd)) {
        //验证成功
        this.pwdState = "smile-o"
        return true
      } else {
        //验证失败
        this.pwdStatae = "warning-o"
        return false
      }
    },
    checkForm() {
      //验证表单
      if (this.checkName() && this.checkPwd()) {
        console.log("验证成功,执行登录业务")
        //发送post请求,执行登录业务
        this.axios
          .post("/login", `client_name=${this.name}&client_pwd=${this.pwd}`)
          .then((res) => {
            console.log(res)
            if (this.imgCode == this.str) {
              if (res.data.code == 200) {
                this.$toast("登录成功")
                //调用mutations中的lognOk,修改vuex用户状态
                this.$store.commit("loginOK", res.data.result.nickname)
                this.$store.commit("loginOKId", res.data.result.client_id)
                this.$store.commit(
                  "loginOKUrl",
                  res.data.result.client_head_url
                )
                this.$router.push("/me")
              } else {
                //登录失败
                this.refreshing()
                this.imgCode = ""
                this.$toast("账号密码输入错误")
              }
            } else {
              this.refreshing()
              this.imgCode = ""
              this.$toast.fail({
                message: "验证码错误,请重新输入",
              })
            }
          })
          .catch((err) => console.log("catch:", err.message))
      }
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
.van-nav-bar__right {
  a {
    color: #fff;
  }
}
</style>
