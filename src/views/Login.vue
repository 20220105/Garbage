<template>
  <div>
    <!--标题栏-->
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <router-link to="/register">新用户</router-link>
      </template>
    </van-nav-bar>
    <van-field type="text" v-model="name" placeholder="请输入用户名"
      label="用户名" @blur.native.capture="checkName" :right-icon="nameState"/>
    <van-field type="password" placeholder="请输入密码"
      label="密码" @blur.native.capture="checkPwd" v-model="pwd" :right-icon="pwdState" />
    <van-button @click="checkForm" type="primary" size="large">安全登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '', //绑定用户名文本框输入的内容
      nameState:'', //绑定用户名文本框的状态
      pwd:'',
      pwdState:''
    }
  },
  methods:{
    checkName(){  //绑定用户名文本框
      let reg=/^\w{6,15}/
      if(reg.test(this.name)){  //验证成功
        this.nameState='smile-o'
        return true
      }else{  //验证失败
        this.nameState='warning-o'
        return false
      }
    },
    checkPwd(){ //密码要求6位数字
      let reg=/^\w{6,15}/
      if(reg.test(this.pwd)){ //验证成功
        this.pwdState='smile-o'
        return true
      }else{ //验证失败
        this.pwdStatae='warning-o'
        return false
      }
    },
    checkForm(){ //验证表单
      if(this.checkName()&&this.checkPwd()){
        console.log('验证成功,执行登录业务')
        //发送post请求,执行登录业务
        this.axios.post('/login',`client_name=${this.name}&client_pwd=${this.pwd}&nickname=${this.nickname}`).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.$toast('登录成功')
            //调用mutations中的lognOk,修改vuex用户状态
            this.$store.commit('loginOK',res.data.result.nickname)
            this.$router.push('/me')
          }else{  //登录失败
            this.$toast('账号密码输入错误')
          }
        }).catch((err)=>console.log("catch:",err.message))
      }
    }
  },
}
</script>

<style>

</style>