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
  </div>
</template>

<script>
import { client } from "../utils/alioss"
export default {
  data() {
    return {
      fileList: [{ url: sessionStorage.getItem("url") }],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
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
</style>
