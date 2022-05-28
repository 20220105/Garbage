<template>
  <div>
    <div class="admin_login">
      <div class="admin_container">
        <div class="v_welcome">欢迎管理员登陆</div>
        <div class="n_login">
          <el-input v-model="a_n" placeholder="请输入内容" clearable></el-input>
        </div>
        <div class="p_login">
          <el-input
            placeholder="请输入密码"
            v-model="a_pwd"
            show-password
            clearable
          ></el-input>
        </div>
        <div>
          <div class="v_login">
            <el-input v-model="a_vf" placeholder="请输入内容"></el-input>
          </div>
          <div @click="shuaxin()" id="aaa">验证码占位区</div>
          <div>点击图片刷新</div>
        </div>
        <el-button @click="dg" type="primary">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a_n: "",
      a_pwd: "",
      a_vf: "",
      str: "",
    }
  },
  methods: {
    dg() {
      let suc = `adminname=${this.a_n}&adminword=${this.a_pwd}`
      if (this.a_vf == this.str) {
        this.axios
          .post("/adminlogin", suc)
          .then((res) => {
            console.log(res)
            if (res.data.code == 200) {
              this.$message({
                message: "登录成功",
                type: "success",
              })
              this.$store.commit("loginOK", res.data.result.admin_name)
              this.$store.commit("loginOKId", res.data.result.admin_id)
              this.$router.push("/")
            } else {
              //登录失败
              this.$message({
                message: "登录失败,您的账号或密码错误,请重新输入",
                type: "warning",
              })
              this.a_vf = ""
              this.shuaxin()
            }
          })
          .catch((err) => {
            console.log("catch", err)
          })
      } else {
        // 验证码错误
        this.$message.error("验证码错误,请重新输入")
        this.a_vf = ""
        this.shuaxin()
      }
    },
    shuaxin() {
      // 发送请求
      this.axios.get("/svg").then((res) => {
        console.log(res)
        let svg = res.data.img
        this.str = res.data.str
        svg = `<div>${svg}</div>`
        aaa.innerHTML = svg
        console.log(this.str)
      })
    },
  },
  mounted() {
    this.shuaxin()
  },
}
</script>

<style scoped>
/* 欢迎文字 */
.v_welcome {
  font-weight: 600;
  margin-left: 135px;
  margin-top: 10px;
  user-select: none;
}
/* 下面三个是输入框的宽度和间距 */
.n_login,
.p_login {
  width: 224px;
  margin: 22px 80px 32px;
}
.v_login {
  width: 224px;
  margin-left: 80px;
}
/* 输入框的伪元素 */
.v_login > div::before {
  content: "验证码 :";
  position: absolute;
  left: -55px;
  top: 10px;
}
/* 验证码的位置 */
#aaa {
  margin-left: 113px;
  margin-top: 20px;
}
/* 验证码兄弟元素下面的点击刷新图片 */
#aaa + div {
  margin-left: 135px;
  margin-top: 10px;
  user-select: none;
}
/* 输入框的伪元素 */
.n_login > div::before {
  content: "账号 :";
  position: absolute;
  left: -42px;
  top: 10px;
}
.p_login > div::before {
  content: "密码 :";
  position: absolute;
  left: -42px;
  top: 10px;
}
/* 最外层的背景 */
.admin_login {
  background-image: url("/gc_admin.png");
  height: 705px;
  background-repeat: no-repeat;
  background-size: 1603px 704px;
  opacity: 1;
}
/* 管理员登陆的框 */
.admin_container {
  border-radius: 47px;
  width: 353px;
  background-color: white;
  padding: 23px;
  position: absolute;
  top: 157px;
  left: 587px;
  opacity: 0.8;
}
/* 按钮的样式 */
::v-deep .el-button {
  margin-left: 145px;
  margin-top: 15px;
}
</style>
