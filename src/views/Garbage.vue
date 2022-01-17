<template>
  <div style="background-color: #f6f6f6" :style="{ height: h + 'px' }">
    <van-nav-bar title="垃圾分类" left-arrow @click-left="onClickLeft" />
    <div class="body">
      <div class="search">
        <van-notice-bar
          left-icon="cluster-o"
          text="智能垃圾分类指南"
          background="#fff"
          color="#25c89b"
        />
        <van-search
          v-model="garbageName"
          shape="round"
          show-action
          maxlength="30"
          autofocus="true"
          clearable
          clear-trigger="focus"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch" style="border-radius: 1.1rem">查询</div>
          </template>
        </van-search>

        <div class="card-1" v-if="!garbageClass">
          <img src="../assets/img/ljfl_search/001.png" alt="" width="100%" />
          <div>
            <van-notice-bar
              left-icon="arrow"
              text="正确合理的进行垃圾分类"
              background="#fff"
              color="#000"
            />
          </div>
          <div class="text">
            <div>
              <p>营造良好的生活环境</p>
              <p>为全球绿色贡献一份力量</p>
              <p>智能垃圾分类查询</p>
            </div>
            <div>
              <img src="../assets/img/ljfl_search/002.jpg" alt="" />
            </div>
          </div>
        </div>
        <div v-else>
          <!-- 搜索到内容渲染 -->
          <div>
            <div class="card-2" :style="{ color: color }">
              <van-row>
                <van-col span="8">
                  <img :src="garbageClass.garbage_class_img_url" alt="" />
                </van-col>
                <van-col span="16">
                  <span>{{ garbageClass.garbage_class_name }} :</span>
                  <span>{{ garbageClass.garbage_class_describe }}</span>
                </van-col>
              </van-row>
            </div>
            <div class="card-3" :style="{ color: color }">
              <van-row>
                <van-col span="24" :style="{ backgroundColor: color }">
                  <span>{{ garbageClass.garbage_class_name }}处理方式</span>
                </van-col>
                <van-col span="24">
                  <span>{{ garbageClass.garbage_class_handling }}</span>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      h: "", //动态高
      color: "", //动态颜色
      garbageName: "", //搜索框查询的值
      garbageClass: "", //获取到的内容
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
      console.log(this.h)
    },
    onSearch() {
      let url = `/search_garbageClass/${this.garbageName}`
      this.axios.get(url).then((res) => {
        this.garbageClass = res.data.result
        console.log(this.garbageClass)
        if (this.garbageClass) {
          let color_id = this.garbageClass.garbage_class_id
          if (color_id == 1) this.color = "#036EB8"
          else if (color_id == 2) this.color = "#094"
          else if (color_id == 3) this.color = "#9FA0A0"
          else if (color_id == 4) this.color = "#E60012"
          else this.color = "blue"
        } else {
          this.$toast.fail({
            message: "抱歉,暂未找到匹配的结果",
            icon: "warning",
          })
        }
      })
    },
  },
  mounted() {
    this.windowHeight()
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
// 搜索框按钮
.van-search__action {
  background-color: #25c89b;
  margin: 0 1.1rem 0 1.1rem;
  padding: 0 1.1rem 0 1.1rem;
  border-radius: 1.1rem;
  color: #fff;
}
.van-search__action:active {
  -webkit-box-shadow: #666 0 0 0.5rem;
  -moz-box-shadow: #666 0 0 0.5rem;
  box-shadow: #666 0 0 0.5rem;
}
.body {
  width: 95%;
  margin: auto;
  .search {
    margin: 0.8rem 0 0.8rem 0;
    border-radius: 1.5rem;
    .van-notice-bar {
      border-radius: 1.5rem 1.5rem 0 0;
    }
    .van-search--show-action {
      border-radius: 0 0 1.5rem 1.5rem;
    }
  }
}
.card-1 {
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 1.5rem;
  img {
    margin: 3rem 0 2.8rem 0;
  }
}
.text {
  display: flex;
  :nth-child(1) {
    width: 65%;
    height: 2rem;
    // background-color: red;
  }
  :nth-child(2) {
    width: 35%;
    // height: 2rem;
    // background-color: yellow;
    img {
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0 0 1.5rem 0;
    }
  }
}
p {
  overflow: hidden;
  margin: 0.5rem 0 0 2.5rem;
  padding: 0;
  width: 100% !important;
  height: 1.4rem !important;
  font-weight: 500;
}
.card-2 {
  width: 100%;
  height: 8.65rem;
  background-color: #fff;
  padding: 1.5rem 0 1.5rem 0;
  border-radius: 1.5rem;
  margin-top: 1rem;
  img {
    display: inline-block;
    overflow: hidden;
  }
  span {
    display: inline-block;
  }
  :nth-child(2) {
    :nth-child(1) {
      font-size: 1.3rem;
      font-weight: 400;
      margin-top: 0.5rem;
    }
    :nth-child(2) {
      margin-top: 1.1rem;
    }
  }
}
.card-3 {
  width: 100%;
  height: 9.65rem;
  border-radius: 1.5rem;
  background-color: #fff;
  margin-top: 1rem;
  :nth-child(1) {
    border-radius: 1.5rem 1.5rem 0 0;
    :nth-child(1) {
      span {
        color: #fff;
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        padding: 1rem 0;
      }
    }
    :nth-child(2) {
      padding: 1rem;
    }
  }
}
</style>
