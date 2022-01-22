<template>
    <div>
<van-nav-bar
  title="回收地址"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
  @select="onSelect"
/>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        chosenAddressId: ''
      };
    },
    // 给vuex的addressDetail字段改个名字,因为组件初始化,传入的默认地址为address
    computed:{
      list(){
        return this.$store.state.address.address.map(val=>{
          let temp = val
          temp.address = temp.addressDetail
          return temp
        })
      },
      currentSelect(){
        return this.$store.state.address.currentSelectId
      }
    },
    mounted(){
      this.chosenAddressId = this.currentSelect
    },
    methods: {
      onClickLeft(){
        this.$router.go('-1')
      },
      onAdd() {
        this.$router.push('/addressedit')
      },
      onEdit(item, index) {
        this.$router.push({name:'addressedit',params:{id:index}})
      },
      onSelect(item,index){
        this.$store.commit('address/changeSelection',index.toString())
      }
    },
  };
</script>
<style scoped>
::v-deep .van-address-list__add{
  background-color:#25c89b !important;
  border-color:#25c89b !important;
}
::v-deep .van-radio__icon--checked i{
  background-color: #25c89b !important;
  border-color:#25c89b !important;
}

::v-deep .van-nav-bar {
  background-color: #25c89b;
}
::v-deep .van-nav-bar__title {
  color: #fff;
}

::v-deep .van-icon-arrow-left:before {
  color: white;
}
::v-deep .van-nav-bar__text {
  color: white;
}

</style>