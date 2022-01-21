<template>
  <div style="background-color: #25c89b; ">
    <!-- 头部搜索栏 -->
    <div class="searchtop">
      <img src="../../public/img/BR.png" @click="goback">
      <div>
        <input type="text" :placeholder="`${this.tjss[Math.ceil(Math.random()*24)]}`">
      </div>
      <p @click="tosearch">搜索</p>
    </div>
    <!-- 历史记录 -->
    <div class="history">
      <h2>历史搜索</h2>
      <div class="hlist">
        <span v-for="(item,index) in historylist" :key="index">{{item}}</span>
      </div>
      <img src="../../public/img/-r.png" @click="clearhistory">
    </div>
    <!-- 推荐搜索 -->
    <div class="recommend">
      <h2>推荐搜索</h2>
      <div class="rlist">
        <span v-for="(item,index) in tjss" :key="index">{{item}}</span>
      </div>
      <img src="../../public/img/8S.png" @click="tonewarr">
    </div>
    <!-- 热搜榜单 -->
    <div class="rank">
      <h2>热搜榜单</h2>
      <div class="klist">
        <p>
          <img src="../../public/img/tM.png">
          <span>单排被三个大佛丢绢子</span>
        </p>
        <p>
          <img src="../../public/img/tO.png">
          <span>他说火男V2是垃圾</span>
        </p>
        <p>
          <img src="../../public/img/tA1.png">
          <span>自从捡了雷刀就只会左蓄力</span>
        </p>
        <p>
          <span>4</span>
          <span>凤凰羽真难振</span>
        </p>
        <p>
          <span>5</span>
          <span>大B阔伤害是真的高</span>
        </p>
        <p>
          <span>6</span>
          <span>室友三发出狼主,命不久矣</span>
        </p>
        <p>
          <span>7</span>
          <span>保底墨离,欲哭无泪</span>
        </p>
        <p>
          <span>8</span>
          <span>新赛季一天上王者</span>
        </p>
        <p>
          <span>9</span>
          <span>她说我是个普信男</span>
        </p>
        <p>
          <span>10</span>
          <span>前任送的,这都能回收</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tjss:['iphone12','拖鞋','男鞋','女鞋','游戏卡带','gucci','包','手链','项链','nike外套','耳机','匡威','平板电脑','巴黎世家','AJ','casio','手表','xr','iphone13','ipodairpro','adidas','彪马','球衣','内衣','长裤'],
        historylist:[],
      }
    },
    methods: {
      //刷新推荐搜索
      tonewarr() {
        this.tjss.sort(
          function() {undefined
            return Math.ceil(Math.random()*25)>13?1:-1
          }
        )
      },
      tosearch() {
        //存入历史记录
        let history=document.querySelector('.history')
        history.style.display='block'
        let input=document.querySelector('.searchtop div input')
        this.historylist.unshift(input.value)
        //带着值跳到results页
        if(input.value) {
          this.$router.push(`/results?value=${input.value}`)
        }else {
          this.$router.push(`/results?value=${input.placeholder}`)
        }
        
      },
      //清空历史记录
      clearhistory() {
        let history=document.querySelector('.history')
        history.style.display='none'
        this.historylist=[]
      },
      goback() {
        this.$router.push(history.go(-1))
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped src="../assets/css/search.css">
element.style {
  background-color: #25c89b;
    
    height: 100vh;
}
</style>