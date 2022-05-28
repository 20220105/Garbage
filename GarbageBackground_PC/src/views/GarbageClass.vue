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
          default-active="garbageClass"
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
            <div style="margin-bottom: 20px">
              <!-- 面包导航栏区域 -->
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>编辑数据/垃圾管理</el-breadcrumb-item>
              </el-breadcrumb>
              <el-button
                type="info"
                round
                icon="el-icon-circle-close"
                @click="toggleSelection()"
                >取消</el-button
              >
              <el-button
                type="success"
                round
                icon="el-icon-circle-plus-outline"
                @click="addGarbage = true"
                >添加</el-button
              >
              <el-button
                type="danger"
                round
                icon="el-icon-delete"
                style="margin-right: 15p + x"
                @click="deleteLists"
                >删除</el-button
              >
              <div
                style="
                  margin-top: 15px;
                  width: 250px;
                  display: inline-block;
                  margin-left: 10px;
                "
              >
                <el-input
                  placeholder="请输入内容"
                  v-model="search"
                  clearable
                  autofocus
                  @input="searchInput"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    @click="searchInput"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              style="width: 100%"
              height="500"
              border
              fit
              @selection-change="handleSelectionChange"
              @row-click="huoquid"
            >
              <el-table-column
                type="selection"
                prop="garbage_id"
              ></el-table-column>
              <el-table-column prop="garbage_name" label="名称" align="center">
              </el-table-column>
              <el-table-column
                prop="garbage_class_name"
                label="类别"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="garbage_remark"
                label="备注"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="caozuo" label="操作" align="center">
                <el-button
                  type="warning"
                  icon="el-icon-s-tools"
                  round
                  @click="updateGarbage = true"
                  >编辑</el-button
                >
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!-- 添加弹出窗 -->
    <el-dialog
      title="添加垃圾数据"
      :visible.sync="addGarbage"
      center
      :before-close="addinfo"
    >
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.garbageName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.garbageClassId" placeholder="请选择垃圾类别">
            <el-option label="可回收垃圾" value="1"></el-option>
            <el-option label="厨余(湿)垃圾" value="2"></el-option>
            <el-option label="其他(干)垃圾" value="3"></el-option>
            <el-option label="有害垃圾" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.garbageRemark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addinfo">取 消</el-button>
        <el-button type="primary" @click="insertGarbage">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出窗 -->
    <el-dialog
      title="修改垃圾数据"
      :visible.sync="updateGarbage"
      center
      :before-close="updateinfo"
    >
      <el-form :model="garbage">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input
            v-model="garbage.garbage_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select
            v-model="garbage.garbage_class_name"
            placeholder="请选择垃圾类别"
          >
            <el-option label="可回收垃圾" value="1"></el-option>
            <el-option label="厨余(湿)垃圾" value="2"></el-option>
            <el-option label="其他(干)垃圾" value="3"></el-option>
            <el-option label="有害垃圾" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="garbage.garbage_remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateinfo">取 消</el-button>
        <el-button type="primary" @click="updateGarbageShuju">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminName: sessionStorage.getItem("name"),
      select: "",
      search: "",
      indexOf: "",
      addGarbage: false,
      updateGarbage: false,
      h: "",
      isCollapse: true,
      tableData: [],
      multipleSelection: [],
      form: {
        garbageName: "",
        garbageClassId: "",
        garbageRemark: "",
      },
      formLabelWidth: "50px", //表单中标签的宽度
      garbageIds: "",
      garbage: {
        garbage_name: "",
        garbage_class_name: "",
        garbage_remark: "",
      },
    }
  },
  methods: {
    // 勾选多选框获取garbage_id
    handleSelectionChange(val) {
      // console.log('val:',val);
      this.multipleSelection = val
      // console.log('mul:',this.multipleSelection);
      let ids = []
      this.multipleSelection.map((key) => {
        ids.push(key.garbage_id)
      })
      this.garbageIds = ids
      console.log("多选", this.garbageIds)
    },
    huoquid(val) {
      this.garbage = val
      console.log(this.garbage)
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      console.log("11")
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$message({ message: "已取消选中状态", type: "info" })
        this.$refs.multipleTable.clearSelection()
      }
    },
    //取消添加操作提示
    addinfo() {
      this.addGarbage = false
      this.$message({ message: "已取消添加", type: "info" })
    },
    //取消编辑修改操作提示
    updateinfo() {
      this.updateGarbage = false
      this.$message({ message: "已取消修改编辑", type: "info" })
    },
    // 查询数据
    getLists() {
      let url = `/getGarbages`
      this.axios.get(url).then((res) => {
        console.log(res)
        this.tableData = res.data.results
      })
    },
    // 添加数据
    insertGarbage() {
      let url = `/addGarbage/${this.form.garbageName}/${this.form.garbageClassId}/${this.form.garbageRemark}`
      console.log(url)
      this.axios.get(url).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.addGarbage = false
          this.$message({
            message: "添加成功",
            type: "success",
          })
          this.form = {}
          this.getLists()
        } else {
          this.$message({
            message: "重复插入错误",
            type: "warning",
          })
          this.form = {}
        }
      })
    },
    // 修改数据
    updateGarbageShuju() {
      let url = `/updateGarbage/${this.garbage.garbage_id}/${this.garbage.garbage_name}/${this.garbage.garbage_class_name}/${this.garbage.garbage_remark}`
      console.log(url)
      this.axios.get(url).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.addGarbage = false
          this.$message({
            message: "修改成功",
            type: "success",
          })
          this.updateGarbage = false
          this.getLists()
        } else {
          this.$message({
            message: "修改失败",
            type: "warning",
          })
        }
      })
    },
    // 删除多条垃圾数据
    deleteLists() {
      console.log(this.garbageIds)
      this.$confirm("此操作将永久删除这些数据 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          let url = `/deleteGarbages`
          let garbageIds = this.garbageIds.toString()
          console.log("Gids", garbageIds)
          garbageIds = `garbageIds=${garbageIds}`
          this.axios.post(url, garbageIds).then((res) => {
            console.log(res)
            if (res.data.code != 200) {
              this.$message({
                type: "error",
                message: "删除失败!",
              })
            } else {
              this.getLists()
              this.$message({
                type: "success",
                message: "删除成功!",
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    // 删除单条垃圾数据
    deleteGarbage() {
      console.log(this.garbageIds)
      this.$confirm("此操作将永久删除这条数据 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          let url = `/deleteGarbage`
          let garbageIds = this.garbageIds.toString()
          console.log("Gids", garbageIds)
          garbageIds = `garbageIds=${garbageIds}`
          this.axios.post(url, garbageIds).then((res) => {
            console.log(res)
            if (res.data.code != 200) {
              this.$message({
                type: "error",
                message: "删除失败!",
              })
            } else {
              this.getLists()
              this.$message({
                type: "success",
                message: "删除成功!",
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    // 搜索
    searchInput() {
      if (this.search) {
        let url = `/searchGarbage/${this.search}`
        this.axios.get(url).then((res) => {
          console.log(res)
          this.tableData = res.data.results
        })
      } else {
        this.getLists()
      }
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
    this.getLists()
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
}
::v-deep .el-dialog {
  width: 400px !important;
}
::v-deep .el-input-group__append {
  border-radius: 0 20px 20px 0;
}
.adminName {
  position: absolute;
  right: 12px;
  color: #fff;
  font-size: 12px;
}
</style>
