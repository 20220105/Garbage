<template>
  <div>
    <div :style="{ backgroundColor: '#25e69b' }">
      <van-nav-bar
        title="回收价值排行榜"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="body">
        <div class="text">
          <span>回收排行榜</span>
          <span>环 保 回 收 &nbsp;&nbsp;创 造 可 循 环 价 值</span>
        </div>
        <div class="my-ranking">
          <van-grid :border="false" :column-num="3">
            <van-grid-item class="head_foot">
              <span>我的排名</span>
              <span>{{ paiming_num }}</span>
            </van-grid-item>
            <van-grid-item v-if="!$store.state.islogin">
              <van-image
                round
                width="60%"
                height="60%"
                src="/head_portrait/002.jpg"
                fit="cover"
              />
              <h4>未登录</h4>
            </van-grid-item>
            <van-grid-item v-else>
              <van-image
                round
                width="60%"
                height="60%"
                :src="$store.state.url"
                fit="cover"
              />
              <h4>{{ $store.state.nickname }}</h4>
            </van-grid-item>
            <van-grid-item
              class="head_foot"
              style="border-radius: 0rem 1rem 1rem 0rem"
            >
              <span>我的积分</span>
              <span v-if="!$store.state.islogin">0.00</span>
              <span v-else>{{ jifen }}</span>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="ranking">
          <van-cell value="环保金">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span>排名</span>
            </template>
            <template #label>
              <div v-if="!rankingList">暂未排名</div>
              <!-- 排名 -->
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="pullup"
              >
                <div class="card" v-for="(item, i) in rankingList" :key="i">
                  <van-image
                    round
                    width="25%"
                    height="25%"
                    :src="item.client_head_url"
                    fit="cover"
                  />
                  <span>{{ item.nickname }}</span>
                  <span>￥{{ item.money_amoun | xiaoshudian }}</span>
                </div>
              </van-list>
            </template>
          </van-cell>
        </div>
        <div></div>
        <van-divider
          :style="{
            color: '#fff',
            borderColor: '#fff',
            padding: '0.3rem 5rem 0.7rem 5rem',
            margin: 0,
          }"
        >
          没有更多了
        </van-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      h: "",
      rankingList: [],
      loading: false,
      finished: false,
      page: 2,
      paiming_num: "",
      jifen: "",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取当前视口的高度
    windowHeight() {
      let de = document.documentElement
      let h =
        self.innerHeight ||
        (de && de.offsetHeight) ||
        document.body.offsetHeight
      this.h = h
      // console.log(this.h)
    },
    // page页数 pageNum每页多少数据
    getRankingList(page) {
      let url = `/rankingList/${page}/6`
      this.axios.get(url).then((res) => {
        this.rankingList.push(...res.data.results)
        this.paiming()
        // console.log(this.rankingList)
      })
    },
    pullup() {
      // console.log("length", this.rankingList.length)
      if (this.rankingList.length % 6 > 0) {
        // 加载状态结束
        this.loading = false
        return
      } else {
        this.page++
        let page = this.page
        this.getRankingList(page, 6)
        this.paiming()
        // 加载状态结束
        this.loading = false
      }
    },
    paiming() {
      let list = this.rankingList
      // console.log("list", list)
      // console.log("object")
      let name = sessionStorage.getItem("name")
      // console.log(name)
      for (const key in list) {
        if (list[key].nickname == name) {
          this.paiming_num = key * 1 + 1
          this.jifen = list[key].integral
          // console.log(this.jifen)
          return
        }
      }
    },
  },
  mounted() {
    this.windowHeight()
    this.getRankingList(1)
    this.getRankingList(2)
    this.paiming()
  },
  filters: {
    // 过滤器
    // 保留两位小数点
    xiaoshudian(value) {
      var toFixedNum = Number(value).toFixed(3)
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
      return realVal
    },
  },
}
</script>

<style lang="scss" scoped>
// 头部背景样式
::v-deep .van-nav-bar {
  background-color: #25c89b;
}
//标题样式
::v-deep .van-nav-bar__title {
  color: #fff;
}
// 头部返回按钮旁边的文字
::v-deep .van-nav-bar__text {
  color: #fff;
}
//头部的返回按钮样式
::v-deep .van-nav-bar__arrow {
  color: #fff;
}

.body {
  width: 100%;
  .text {
    text-align: center;
    margin-bottom: 0.8rem;
    span {
      display: block;
      color: #fff;
    }
    :nth-child(1) {
      font-family: "华文新魏";
      font-size: 3rem;
      margin: 0.5rem 0;
    }
  }
  .my-ranking {
    width: 95%;
    margin: auto;
    border-radius: 50%;
    background-color: #fff;
    margin-bottom: 0.8rem;
    .head_foot {
      span {
        font-size: 1.1rem;
        color: #9d9d9d;
      }
      span:last-child {
        margin-top: 0.3rem;
        font-size: 1.8rem;
        color: #25c89b;
      }
    }
    h4 {
      padding: 0;
      margin: 0.3rem 0 0 0;
      font-weight: 500;
    }
  }
}
.ranking {
  width: 95%;
  margin: auto;
  .card {
    position: relative;
    font-size: 1.1rem;
    margin: 0.5rem 0;
    background-color: #f0f0f0;
    border-radius: 0.5rem 0 0 0.5rem;
    span {
      position: relative;
      transform: translateY(-55%);
      display: inline-block;
      color: #242424;
    }
    :nth-child(2) {
      color: #242424;
      margin-left: 0.6rem;
    }
    :nth-child(3) {
      position: absolute;
      left: 15.3rem;
      bottom: -0.25rem;
      display: inline-block;
      width: 5rem;
      text-align: center;
    }
  }
  :nth-child(odd) {
    background-color: #fbfafa;
  }
}
</style>
