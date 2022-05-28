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
          default-active=""
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
          <el-menu-item @click="$message('友情连接')">
            <i class="el-icon-s-promotion"></i>
            <span slot="title" class="menu-yiji">友情链接</span>
          </el-menu-item>
        </el-menu>

        <el-container>
          <el-main style="width: 100%"> </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      h: "",
      isCollapse: true,
      adminName: sessionStorage.getItem("name"),
    }
  },
  methods: {
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      console.log("11")
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
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
  },
  mounted() {
    this.windowHeight()
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
  background-image: url("/lajifenleipic.jpg");
  background-size: cover;
}
.adminName {
  position: absolute;
  right: 12px;
  color: #fff;
  font-size: 12px;
}
</style>
