<template>
  <div>
    <div class="main">
      <!-- 头部搜索栏 -->
      <div class="searchtop">
        <img src="/img/BR.png" @click="goback" />
        <div>
          <input type="text" />
        </div>
        <p @click="tosearch">搜索</p>
      </div>
      <div class="screen">
        <!-- 筛选开始 -->
        <div class="screen-one">
          <ul @click="listactive">
            <li class="liactive">综合排序</li>
            <li>价格</li>
            <li>最新上架</li>
          </ul>
        </div>
        <!-- 筛选结束 -->
        <!-- 商品列表开始 -->
        <div class="goodsmain">
          <router-link :to="`/details?gid=${item.gid}`" v-for="(item,index) in results" :key="index">
            <div>
              <img :src="`/img/two/${item.img}`">
              <p>
                <span>{{item.goodlevel}}·</span>
                <span>{{item.brand}} </span>
                <span>{{item.title}}</span>
              </p>
              <span>&nbsp;&nbsp;{{item.nprice}} </span>
              <span>市场价￥</span>
              <s>{{item.oprice}}</s>
            </div>
          </router-link>
        </div>
        <!-- 商品列表结束 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results:[],
    };
  },
  methods: {
    listactive(e) {
      let list = document.querySelectorAll(".main .screen>.screen-one>ul>li");
      if (e.target.tagName == "LI") {
        list.forEach((item) => {
          item.className = "";
          e.target.className = "liactive";
        });
      }
    },
    goback() {
      this.$router.push(history.go(-1))
    },
    tosearch() {
      let input=document.querySelector('.searchtop div input')
      //console.log(input.value);
      this.axios.get(`/getresults?value=${input.value}`).then(res=>{
        //console.log(res.data.results);
        this.results=res.data.results
      })
    },
  },
  mounted () {
    let input=document.querySelector('.searchtop div input')
    //console.log(input.value);
    //接收传过来的值
    for(var k in this.$route.query){
      if(k=='value') {
        input.value=this.$route.query.value
        this.axios.get(`/getresults?value=${input.value}`).then(res=>{
          //console.log(res.data.results);
          this.results=res.data.results
        })
      }else {
        input.value=this.$route.query.tname
        this.axios.get(`/getresultstid?tid=${this.$route.query.tid}`).then(res=>{
          //console.log(res.data.results);
          this.results=res.data.results
        })
      }
    }
    
  },
};
</script>

<style scoped src="../assets/css/results.css">
</style>