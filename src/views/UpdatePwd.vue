<template>
  <div>
    <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />

    <div v-show="show">
      <van-cell-group>
        <van-cell title="验证当前密码" />
        <van-field
          v-model="oldPwd"
          type="password"
          label="密码"
          placeholder="请输入当前密码"
          clearable
          :error-message="msg"
        />
      </van-cell-group>
      <van-button type="primary" block @click="next">下一步</van-button>
    </div>
    <div v-show="newShow">
      <van-cell-group>
        <van-cell title="设置新密码" />
        <van-field
          v-model="pwd"
          type="password"
          label="新密码"
          placeholder="请设置新密码"
          clearable
          @input="pwdChange"
          :error-message="pwdmsg"
        />
        <van-field
          v-model="newPwd"
          type="password"
          label="确认密码"
          placeholder="请在此输入新密码"
          clearable
          @input="newPwdChange"
          :error-message="newpwdmsg"
        />
      </van-cell-group>
      <van-button type="primary" block @click="submit">确认修改</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      pwd: "",
      newPwd: "",
      oldPwd: "",
      show: true,
      newShow: false,
      pwdmsg: "",
      newpwdmsg: "",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    next() {
      // 获取用户id
      let uid = sessionStorage.getItem("id")
      let params = `uid=${uid}&oldPwd=${this.oldPwd}`
      this.axios.post("/searchPwd", params).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.show = false
          this.newShow = true
          this.$toast.success("密码正确")
        } else {
          this.$toast.fail("密码错误")
        }
      })
    },
    pwdChange(val) {
      if (val) {
        if (!/^.{6,18}$/.test(val)) {
          this.pwdmsg = "密码格式不正确"
        } else {
          this.pwdmsg = ""
        }
      } else {
        this.pwdmsg = "请输入密码"
      }
    },
    newPwdChange(val) {
      if (val) {
        if (this.newPwd != this.pwd) {
          this.newpwdmsg = "与上方密码不一致"
        } else {
          this.newpwdmsg = ""
        }
      } else {
        this.newpwdmsg = "请重新输入密码"
      }
    },
    // 确认修改密码
    submit() {
      // 获取用户id
      let uid = sessionStorage.getItem("id")
      let params = `uid=${uid}&newPwd=${this.newPwd}`
      this.axios.post("/updatePwd", params).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.$toast.success("修改成功,请重新登录")
          // 清空session
          window.sessionStorage.clear()
          // 跳转到登录页
          this.$router.push("/login")
        } else {
          this.$toast.fail("修改失败")
        }
      })
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
// 按钮底部定位
.van-button--block {
  position: fixed;
  bottom: 0;
}
</style>
