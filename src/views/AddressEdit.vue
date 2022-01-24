
<template>
  <div>
    <van-nav-bar
      title="编辑地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--  地址编辑 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="initAddressInfo"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-area="onChangeArea"
      @select-area="onSelectArea"
    />
    </div>
</template>

<script>
  import { areaList } from '@vant/area-data'//Vant 官方提供了一份默认的省市区数据
  import { WebServiceKey, JsApiKey } from '../utils/map.config';
  export default {
  data() {
    return {
      areaList,//省市区
      currentArea: [],//当前地区
      searchResult: [{}],//搜索结果
    };
  },
  // AddressEdit 地址编辑
  computed:{
    initAddressInfo(){
      if(this.$route.params.id !== undefined){
        return this.$store.state.address.address.find(val=>val.id === this.$route.params.id)
      }else
        return undefined
    }
  },

  methods: {
    async searchPoi(val,area){
      let res = await this.axios.get('https://restapi.amap.com/v3/place/text?parameters',{
        params:{
          key: WebServiceKey,
          keywords: val,
          city: area[1].name,
          offset: 10
        }
      })
      // 高德api返回的数据,1代表api调用成功没有错误(0有错误)
      if(res.data.status === "1" && res.data.pois.length > 0){
        return res.data.pois.filter(val=>typeof val.address === 'string' && val.address !== '').map(val=>{
          return {
            name: val.name,
            // 三目运算符判断是否为直辖市
            address: val.pname === val.cityname ? val.cityname + val.adname + val.address : val.pname + val.cityname + val.adname + val.address,
            pname: val.pname,
            // code分别对应省/市/区编码
            pcode: val.pcode,
            cityname: val.cityname,
            citycode: val.citycode,
            adname: val.adname,
            adcode: val.adcode
          }
        }).slice(0,7)
      }else{
        return []
      }
    },
    onChangeArea(val){
      this.currentArea = val
    },
    onClickLeft(){
      this.$router.back()
    },
    // 整理数据,存入vuex,指定不同的数据源
    onSave(content) {
      let temp = {
        id: this.$route.params.id,
        addressDetail: content.addressDetail,
        areaCode: this.currentArea[2]?.code || content.areaCode,
        city: this.currentArea[1]?.name || content.city,
        county: this.currentArea[2]?.name || content.county,
        isDefault: content.isDefault,
        name: content.name,
        postalCode: content.postalCode,
        province: this.currentArea[0]?.name || content.province,
        tel: content.tel

      }
      this.$store.commit('address/pushAddress',temp)
      alert('保存成功')
      this.$router.push('/recyclingadd')
    },
    onDelete(content) {
      if(content.id !== undefined){
        this.$store.commit('address/removeAddress',content.id)
              console.log(content.id)
        alert('删除成功')
        this.$router.push('/recyclingadd')
      }else{
        this.$router.push('/recyclingadd')
      }
    },
    // 详细地址框输入的实时搜索地址功能
    async onChangeDetail(val) {
      if (val) {
        if(this.currentArea.length > 0){
          let res = await this.searchPoi(val,this.currentArea)
          this.searchResult = res
        }
      } else {
        this.searchResult = [];
      }
    },
    // 避免搜出来的地区和上面选的地区不一致,保存搜到的地址数据
    onSelectArea(val){
      this.currentArea = [{
        name: val.pname,
        code: val.pcode
      },{
        name: val.cityname,
        code: val.pcode
      },{
        name: val.adname,
        code: val.adcode
      }]
    }
  },
};
</script>
<style scoped>
::v-deep .van-address-edit__buttons > button:nth-of-type(1){
  background-color:#25c89b !important;
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