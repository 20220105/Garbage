<template>
  <div>
    <van-tabs>
      <van-tab v-model="active" v-for="index in 8" :key="index" :title="'标签 ' + index" swipeable>
        <van-empty
          class="custom-image"
          image="/暂无订单.png"
          description="暂无订单"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
::v-deep .van-empty__image img{
   height: 14em;
   margin-top: 5em;
}
::v-deep .van-tabs__line{
  background-color: #25c89b;
}
::v-deep .van-empty__description{
  margin-top: 8em;
}
</style>