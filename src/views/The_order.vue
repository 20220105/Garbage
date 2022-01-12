<template>
  <div>
    <van-nav-bar title="订单" left-text="返回" left-arrow></van-nav-bar>
    <o-tabs></o-tabs>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue'
import OTabs from '../components/oTabs.vue'
  export default {
  components: { OTabs },
    
  }
</script>

<style scoped>
.van-nav-bar {
  background-color: #25c89b;
}
::v-deep .van-nav-bar__title{
  
  color: white;
}
::v-deep .van-icon-arrow-left:before{
  color: white;
}
::v-deep .van-nav-bar__text{
  color: white;
}
</style>