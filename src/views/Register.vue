<template>
    <div>
        <!--标题栏-->
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)">
            <template #right>
                <router-link to="/login">登录</router-link>
            </template>
        </van-nav-bar>
        <!--输入框-->
        <van-field type="text" v-model="name" @blur.native.capture="checkName" label="用户名" />
        <van-field type="password" v-model="pwd" @blur.native.capture="checkpwd" label="密码" />
        <van-field type="password" v-model="repwd" @blur.native.capture="checkRepwd" label="重复密码" />
        <van-field type="text" v-model="nickname" @blur.native.capture="checkNickName" label="输入昵称" />
        <van-button @click="checkForm" type="primary" size="large">快速注册</van-button>
    </div>
</template>

<script>
export default {    
    data(){
        return{
            name:'',//绑定用户名文本输入的内容
            nameState:'',//绑定用户名文本框的状态
            pwd:'',
            pwdState:'',
            repwd:'',
            repwdState:'',
            nickname:'',
            nicknameState:''
        }
    },
    methods:{
        checkName(){ //验证用户名文本框
            let reg=/^\w{6,15}$/;
            if(reg.test(this.name)){ //验证成功
                this.nameState='success'
                return true
            }else{ //验证失败
                this.nameState='error'
                return false
            }
        },
        checkPwd(){ //密码要求6位数字
            let reg=/^\d{6}$/;
            if(reg.test(this.pwd)){ //验证成功
                this.pwdState='success'
                return true
            }else{   // 验证失败
                this.pwdState='error'
                return false
            }
        },
        checkRepwd(){
            let reg=/^\d{6}$/;
            if(reg.test(this.repwd)&&this.pwd==this.repwd){ //验证成功
                this.repwdState='success'
                return true
            }else{ //验证失败
                this.repwdState='error'
                return false
            }
        },
        checkNickName(){
            if(this.value.length!=0){
                  this.nicknameState='success'
                  return true
            }else{ //验证失败
                this.nicknameState='error'
                return false
            }
        },
        checkForm(){ //验证表单
            if(this.checkName()&&this.checkPwd()&&this.checkRepwd()&&this.checkName()){
                console.log('验证成功,执行注册业务...')
                //发送post请求,执行注册业务
                this.axios.post('/register',`username=${this.name}&password=${this.pwd}&${this.nickname}`).then(res=>{
                    console.log(res)
                    if(res.data.code==200){ //注册成功
                        this.$toast('注册成功')
                        this.$router.push('/login')
                    }else if(res.data.code==201){ //用户已存在
                        this.$messagebox('提示','用户已存在')
                    }
                })
            }
        },
    }
}
</script>

<style>

</style>