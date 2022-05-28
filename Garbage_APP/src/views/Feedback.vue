<template>
  <div>
    <van-nav-bar title="意见反馈" left-arrow @click-left="onClickLeft" />
    <div>
      请选择反馈类型<br /><br />
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio name="1">投诉</van-radio>
        <van-radio name="0">建议</van-radio>
      </van-radio-group>

      <van-field
        v-model="phone"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
        @input="onChange"
        maxlength="11"
        :error-message="msg"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="120"
        placeholder="请填写您的宝贵意见,如果意见被我们采纳将会获得10个环保金"
        show-word-limit
      />
      <van-button type="primary" size="large" @click="onTijiao"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      phone: "",
      message: "",
      msg: "",
    }
  },
  methods: {
    // 手机正则
    onChange(val) {
      if (!/^1[3-9]\d{9}$/.test(val)) {
        this.msg = "手机号格式有误"
      } else {
        this.msg = ""
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onTijiao() {
      let url = `/feedback/${this.radio}/${this.phone}/${this.message}`
      this.axios.get(url).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          // location.reload()
          this.radio = 1
          this.tel = ""
          this.message = ""
          this.$toast.success("意见反馈成功")
        } else {
          this.$toast.fail("意见反馈失败")
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
.van-radio-group--horizontal {
  width: 41%;
  margin: auto;
}
</style>
