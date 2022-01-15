<template>
  <div>
    <van-tabs swipeable animated>
      <van-tab
        v-model="active"
        v-for="index in 8"
        :key="index"
        :title="'标签 ' + index"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <p>刷新次数: {{ count }}</p>
          
          <van-empty
            class="custom-image"
            image="/暂无订单.png"
            description="暂无订单"
            v-if="dd"
          />
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            v-else
          />
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dd:false,
      count: 0,
      isLoading: true,
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
  },
};
</script>

<style scoped>
::v-deep .van-empty__image img {
  height: 14rem;
  margin-top: 5rem;
}
::v-deep .van-tabs__line {
  background-color: #25c89b;
}
::v-deep .van-empty__description {
  margin-top: 8em;
}
</style>