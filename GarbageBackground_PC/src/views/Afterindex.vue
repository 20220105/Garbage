<template>
  <div>
    <div>
      <el-container>
        <el-header>
          <router-link to="/">
            <i class="el-icon-s-platform"></i>
            <span>垃圾分类后台管理系统</span>
          </router-link>
          <span class="adminName"
            >欢迎管理员:{{ adminName }}
            <el-button size="mini" round type="primary" @click="exit"
              >退出登录</el-button
            ></span
          >
        </el-header>
      </el-container>
      <el-container>
        <el-header>
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group></el-header
        >
      </el-container>
      <el-container
        style="border: 1px solid #eee"
        :style="{ height: h - 135.5 + 'px' }"
      >
        <el-menu
          router
          default-active="afterindex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#25c89b"
        >
          <el-menu-item index="afterindex">
            <i class="el-icon-s-home"></i>
            <span slot="title" class="menu-yiji">首页管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span slot="title" class="menu-yiji">数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="garbageClass">
                <i class="el-icon-s-data"></i>
                <span>编辑数据</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title" class="menu-yiji">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="collectorUsers">
                <i class="el-icon-user-solid"></i>
                <span>回收员管理</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="feedbacks">
                <i class="el-icon-s-shop"></i>
                <span>投诉/意见管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title" class="menu-yiji">友情链接</span>
          </el-menu-item>
        </el-menu>

        <el-container>
          <el-main style="width: 100%">
            <!-- 面包导航栏区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>首页管理/数据分析</el-breadcrumb-item>
            </el-breadcrumb>
            <div
              id="myChart"
              :style="{
                width: '480px',
                height: '300px',
                border: '1px solid #ccc',
                margin: '20px',
                float: 'left',
              }"
            ></div>
            <div
              id="main"
              :style="{
                width: '480px',
                height: '300px',
                border: '1px solid #ccc',
                margin: '20px',
                float: 'left',
              }"
            ></div>
            <div
              id="mainTwo"
              :style="{
                width: '480px',
                height: '300px',
                border: '1px solid #ccc',
                margin: '20px',
                float: 'left',
              }"
            ></div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts")
// 引入柱状图组件
require("echarts/lib/chart/bar")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")
export default {
  name: "index",
  data() {
    return {
      h: "",
      msg: "",
      clientCount: "",
      data: "",
      countData: "",
      isCollapse: true, //展开收起
      adminName: sessionStorage.getItem("name"),
    }
  },

  mounted() {
    this.drawLine()
    this.myEcharts()
    this.drawLineTwo()
  },

  methods: {
    exit() {
      this.$confirm("此操作将会退出登录, 是否继续?", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录,如需继续操作请重新登录",
          })
          // 清空session
          window.sessionStorage.clear()
          // 跳转到登录页
          this.$router.push("/adminLogin")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          })
        })
    },
    // 展开收起
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      console.log("11")
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 获取数据
    async getclient() {
      let url = "/client_count"
      await this.axios.get(url).then((res) => {
        this.clientCount = res.data.results[0]
      })
      // console.log(this.clientCount)
      let data = []
      let countData = []
      let count = 0
      // let baifenbi = []
      for (let key in this.clientCount) {
        data.push(key)
        countData.push(this.clientCount[key])
      }
      this.data = data
      this.countData = countData
    },
    // 柱形图
    async drawLine() {
      await this.getclient()
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"))
      // 绘制图表
      myChart.setOption({
        title: {
          text: "区间金额用户量",
        },
        tooltip: {},
        xAxis: {
          data: this.data,
        },
        yAxis: {},
        series: [
          {
            name: "区间金额用户量",
            type: "bar",
            data: this.countData,
          },
        ],
      })
    },

    // 扇形图
    async myEcharts() {
      await this.getclient()
      console.log(this.data)
      console.log(this.countData)
      let result = this.data.map((data, i) => ({
        name: data,
        value: this.countData[i],
      }))
      console.log(result)
      this.chart = echarts.init(document.getElementById("main"))
      this.chart.setOption({
        title: {
          text: "金额区间用户数量占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.data,
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            // center: ["50%", "40%"],
            data: result,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      })
    },

    // 折线图
    async drawLineTwo() {
      await this.getclient()
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainTwo"))
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: ["询问人数", "访问人数"],
        },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: "none",
            // },
            // dataView: { readOnly: false },
            // magicType: { type: ["line", "bar"] },
            // restore: {},
            // saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.data,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "区间金额用户量",
            type: "line",
            data: this.countData,
            markPoint: {
              data: [
                // { type: "max", name: "最大值" },
                // { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              // data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "区间积分用户量",
            type: "line",
            data: [5, 4, 1, 6, 5],
            markPoint: {
              // data: [{ name: "周最低", value: 2, xAxis: 1, yAxis: 1.5 }],
            },
            markLine: {
              data: [
                // { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      // normal: {
                      //   position: "start",
                      //   formatter: "最大值",
                      // },
                    },
                    // type: "max",
                    // name: "最高点",
                  },
                ],
              ],
            },
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #25c89b;
}
body {
  background-color: #545c64;
}
.el-header {
  background-color: #545c64;
  line-height: 60px;
  color: #25c89b;
  i {
    font-size: 28px;
  }
  span {
    font-size: 22px;
    font-family: "华文新魏";
    margin-left: 10px;
  }
}
::v-deep .el-menu-item-group__title {
  padding: 0;
}
.menu-yiji {
  margin-right: 75px;
}
.el-main {
  background-color: #fff;
  padding: 0;
}
.el-breadcrumb {
  margin-left: 20px;
  margin-top: 20px;
}
.adminName {
  position: absolute;
  right: 12px;
  color: #fff;
  font-size: 12px;
}
</style>
