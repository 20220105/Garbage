<template>
  <div :style="{ height: h + 'px' }">
    <van-nav-bar title="注册" @click-left="onClickLeft" left-arrow>
    </van-nav-bar>
    <van-form @submit="onSubmit" :style="{ height: h - 46 + 'px' }">
      <van-field
        v-model="name"
        name="Name"
        label="姓名"
        placeholder="真实姓名"
        clearable
        :rules="[{ validator: Name, message: '请输入正确的用户名' }]"
      />
      <van-field
        v-model="phone"
        name="validator"
        label="手机号"
        placeholder="手机号"
        clearable
        :rules="[{ validator, message: '请输入正确的手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="Password"
        label="密码"
        placeholder="密码"
        clearable
        :rules="[{ validator: Password, message: '请输入密码' }]"
      />
      <van-button
        block
        type="primary"
        native-type="submit"
        :style="{ marginTop: h - 223 + 'px' }"
        >提交</van-button
      >
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      password: "",
      h: "",
    }
  },
  methods: {
    // 姓名正则
    Name(val) {
      return /^[\u4E00-\u9FA5]{2,5}$/.test(val)
    },
    // 手机号正则
    validator(val) {
      return /^1[3-9]\d{9}$/.test(val)
    },
    // 密码正则
    Password(val) {
      return /^.{6,18}$/.test(val)
    },
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
      let params = `name=${this.name}&phone=${this.phone}&pwd=${this.password}`
      this.axios.post("/collectorRegister", params).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.$toast.success("注册成功")
          this.$router.push("/login")
        } else {
          //登录失败
          this.$toast.fail("注册失败,请重新注册")
        }
      })
    },
  },
  mounted() {
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
</style>
