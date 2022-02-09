<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />

    <van-uploader :after-read="afterRead" multiple :max-count="1">
      <van-image
        round
        width="5rem"
        height="5rem"
        fit="cover"
        :src="fileList[0].url"
    /></van-uploader>

    <van-cell-group>
      <van-field
        v-model="nicheng"
        label="昵称"
        placeholder="请输入想要修改的昵称"
        @input="nickChange"
        :error-message="nickmsg"
        clearable
      />
      <van-field
        v-model="phone"
        type="tel"
        label="手机号"
        placeholder="请输入想要修改的手机号"
        clearable
        @input="onChange"
        :error-message="msg"
      />
      <van-cell title="密码" value="点击修改" to="updatePwd" />
      <van-cell title="退出登录" label="点击退出登录" @click="logOut" />
    </van-cell-group>
    <van-button type="primary" block @click="baocunUpdate">保存修改</van-button>
  </div>
</template>

<script>
import { client } from "../utils/alioss"
export default {
  data() {
    return {
      fileList: [{ url: sessionStorage.getItem("url") }],
      nicheng: sessionStorage.getItem("name"),
      phone: "",
      msg: "",
      nickmsg: "",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/me")
      this.$router.go("0")
      this.$router.go("0")
    },
    afterRead(file) {
      this.$toast.loading({
        message: "修改中...",
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

          // 获取用户id
          let uid = sessionStorage.getItem("id")
          let params = `uid=${uid}&imgUrl=${this.url}`
          console.log(params)
          this.axios.post("/updateHead", params).then((res) => {
            // console.log(res)
            if (res.data.code != 200) {
              this.$toast.fail("抱歉,上传失败,请重新上传")
            } else {
              this.fileList[0].url = this.url
              sessionStorage.setItem("url", this.url)
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
    getphone() {
      // console.log(sessionStorage.getItem("id"))
      let url = `/getphone/${sessionStorage.getItem("id")}`
      this.axios.get(url).then((res) => {
        // console.log(res)
        this.phone = res.data.result.client_phone
      })
    },
    onChange(val) {
      if (val) {
        if (!/^1[3-9]\d{9}$/.test(val)) {
          this.msg = "请输入正确的手机号"
        } else {
          this.msg = ""
        }
      } else {
        this.msg = "请输入手机号"
      }
    },
    nickChange(val) {
      if (val) {
        if (!/^[\u4e00-\u9fa5]{2,6}$/.test(val)) {
          this.nickmsg = "昵称由2~6位汉字组成"
        } else {
          this.nickmsg = ""
        }
      } else {
        this.nickmsg = "请输入昵称"
      }
    },
    baocunUpdate() {
      if (this.msg || this.nickmsg) {
        this.$toast.fail("昵称或者手机号格式不正确")
        return
      }
      // 获取用户id
      let uid = sessionStorage.getItem("id")
      let params = `uid=${uid}&nickname=${this.nicheng}&phone=${this.phone}`
      // console.log(params)
      this.axios.post("/updateMessage", params).then((res) => {
        // console.log(res)
        if (res.data.code != 200) {
          this.$toast.fail("抱歉,修改失败")
        } else {
          sessionStorage.setItem("name", this.nicheng)
          this.$toast.success("修改成功")
        }
      })
    },
    // 退出登录logOut
    logOut() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "是否确认退出登录",
        })
        .then(() => {
          // on confirm
          this.$toast.success("退出登录成功,如需进行其它业务请重新登录")
          // 清空session
          window.sessionStorage.clear()
          // 跳转到登录页
          this.$router.push("/login")
        })
        .catch(() => {
          // on cancel
          this.$toast.fail("已取消退出登录")
        })
    },
  },
  mounted() {
    this.getphone()
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
// 头像
.van-uploader {
  display: block;
  margin-top: 0.5rem;
}
::v-deep .van-uploader__input-wrapper {
  display: block;
  margin: auto;
}

// 按钮底部定位
.van-button--block {
  position: fixed;
  bottom: 0;
}
</style>
