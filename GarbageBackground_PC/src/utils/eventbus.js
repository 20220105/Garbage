import Vue from "vue"
const EventBus=new Vue();
//拦截对象:Vue()
//基于两个方法  $on和$emit
//广播机制
Object.defineProperties(Vue.prototype,{
    $bus:{
        get(){
            return EventBus
        }
    }
})