<template>
  <div>
    <!-- v-model="active" -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>