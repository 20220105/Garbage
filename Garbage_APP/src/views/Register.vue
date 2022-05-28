<template>
    <div>
        <!--标题栏-->
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)">
            <template #right>
                <router-link to="/login">登录</router-link>
            </template>
        </van-nav-bar>
        <!--输入框-->
        <van-field type="text" v-model="client_name" @blur.native.capture="checkName" label="用户名" :right-icon="nameState" />
        <van-field type="password" v-model="client_pwd" @blur.native.capture="checkPwd" label="密码" :right-icon="pwdState" />
        <van-field type="password" v-model="repwd" @blur.native.capture="checkRepwd" label="重复密码" :right-icon="repwdState" />
        <van-field type="text" v-model="nickname" @blur.native.capture="checkNickName" label="输入昵称"  :right-icon="nicknameState" />
        <van-field type="text" v-model="client_phone" @blur.native.capture="checkPhone" label="输入手机号" :right-icon="phoneState"/>
        <van-button @click="checkForm" type="primary" size="large">快速注册</van-button>
    </div>
</template>

<script>
export default {    
    data(){
        return{
            client_name:'',//绑定用户名文本输入的内容
            nameState:'',//绑定用户名文本框的状态
            client_pwd:'',
            pwdState:'',
            repwd:'',
            repwdState:'',
            nickname:'',
            nicknameState:'',
            client_phone:'',
            phoneState:''
        }
    },
    methods:{
        checkName(){ //验证用户名文本框
            let reg=/^\w{6,15}$/;
            if(reg.test(this.client_name)){ //验证成功
                this.nameState='smile-o'
                return true
            }else{ //验证失败
                this.nameState='warning-o'
                return false
            }
        },
        checkPwd(){ //密码要求
            let reg=/^.{6,18}$/;
            if(reg.test(this.client_pwd)){ //验证成功
                this.pwdState='smile-o'
                return true
            }else{   // 验证失败
                this.pwdState='warning-o'
                return false
            }
        },
        checkRepwd(){
            let reg=/^.{6,18}$/;
            if(reg.test(this.repwd)&&this.client_pwd==this.repwd){ //验证成功
                this.repwdState='smile-o'
                return true
            }else{ //验证失败
                this.repwdState='warning-o'
                return false
            }
        },
        checkNickName(){
            let nls=/^[\u4e00-\u9fa5]{2,6}&/;
            let sw=/([我|卧|倭|喔|沃]|wo)\s*([草|槽|曹|糙|嘈|漕|屮|艹|操])/
            if(!nls.test(this.nickname)&&!sw.test(this.nickname)){
                this.nicknameState='smile-o'
                return true
            }else{
                this.nicknameState='warning-o'
                return false
            }
        },
        checkPhone(){
            let reg=/^1[3-9]\d{9}$/
            if(reg.test(this.client_phone)){
                this.phoneState='smile-o';
                return true;
            }else{
                this.phoneState='warning-o';
                return false;
            }
        },
        checkForm(){ //验证表单
            if(this.checkName()&&this.checkPwd()&&this.checkRepwd()&&this.checkNickName()&&this.checkPhone()){
                console.log('验证成功,执行注册业务...')
                //发送post请求,执行注册业务
                this.axios.post('/register',`client_name=${this.client_name}&client_pwd=${this.client_pwd}&nickname=${this.nickname}&client_phone=${this.client_phone}`).then(res=>{
                    console.log(res)
                    if(res.data.code==200){ //注册成功
                        this.$toast('注册成功')
                        this.$router.push('/login')
                    }else if(res.data.code==201){ //用户已存在
                        this.$toast('用户已存在')
                    }
                })
            }
        },
    }
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
.van-nav-bar__right{
  a{
    color: #fff;
  }
}
</style>