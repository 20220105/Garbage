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
          default-active="collectorUsers"
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
              <el-menu-item index="GarbageClass">
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
                @click="dialogVisible = true"
                >添加</el-button
              >
              <el-button
                type="danger"
                round
                icon="el-icon-delete"
                style="margin-right: 15px"
                @click="deleteLists"
                >删除</el-button
              >
              <div
                style="margin-top: 15px; width: 250px; display: inline-block"
              >
                <el-input
                  v-model="search"
                  @input="onSubmitSearch"
                  placeholder="请输入内容"
                  clearable
                  autofocus
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    @click="onSubmitSearch"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @row-click="huoquid"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  prop="collector_id"
                  width="55"
                >
                </el-table-column>
                <el-table-column
                  prop="collector_name"
                  label="回收员姓名"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="collector_phone"
                  label="回收员电话"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="collector_address"
                  label="回收员地址"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="caozuo"
                  label="操作"
                  width="300"
                  align="center"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-s-tools"
                    @click="updateCollectorUsers = true"
                    round
                    >编辑</el-button
                  >
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!--添加弹出框-->
    <el-dialog
      title="添加回收员用户"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleShut"
    >
      <el-form label-width="100px" :model="addForm" ref="addForm">
        <el-form-item label="回收员名称">
          <el-input v-model="addForm.collector_name" />
        </el-form-item>
        <el-form-item label="回收员密码">
          <el-input v-model="addForm.collector_pwd" />
        </el-form-item>
        <el-form-item label="回收员电话">
          <el-input v-model="addForm.collector_phone" />
        </el-form-item>
        <el-form-item label="回收员地址">
          <el-input v-model="addForm.collector_address" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCollectorUser">确定</el-button>
      </span>
    </el-dialog>
    <!--编辑弹出框-->
    <el-dialog
      title="修改回收员数据"
      :visible.sync="updateCollectorUsers"
      center
      :before-close="updateinfo"
    >
      <el-form :model="collectorUsers">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input
            v-model="collectorUsers.collector_name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input
            v-model="collectorUsers.collector_phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            v-model="collectorUsers.collector_address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateinfo">取 消</el-button>
        <el-button type="primary" @click="updateCollectorUsersShuju"
          >确 定</el-button
        >
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
      h: "",
      indexOf: "",
      dialogVisible: false,
      updateCollectorUsers: false,
      h: "",
      isCollapse: true,
      tableData: [],
      multipleSelection: [],
      addForm: {
        collector_name: "",
        collector_pwd: "",
        collector_phone: "",
        collector_address: "",
      },
      formLabelWidth: "100px",
      collectorUsersIds: "",
      collectorUsers: {
        collector_name: "",
        collector_phone: "",
        collector_address: "",
      },
    }
  },
  methods: {
    //勾选多选框获取collector_id
    handleSelectionChange(val) {
      //console.log('val',val)
      this.multipleSelection = val
      //console.log('mul:',multipleSelection)
      let ids = []
      this.multipleSelection.map((key) => {
        ids.push(key.collector_id)
        console.log(ids)
      })
      this.collectorUsersIds = ids
      console.log("多选", this.collectorUsersIds)
    },
    huoquid(val) {
      this.collectorUsers = val
      console.log(this.collectorUsers)
    },
    handleShut(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // //编辑按钮
    // handleEdit(index,row){
    //   this.$bus.$emit("onEditorEvent",row)
    // },
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
    //取消编辑修改操作提示
    updateinfo() {
      this.updateCollectorUsers = false
      this.$message({ message: "已取消修改编辑", type: "info" })
    },
    getLists() {
      let url = `/v1/list`
      this.axios.get(url).then((res) => {
        console.log(res)
        this.tableData = res.data
        if (res.data.status == 200) {
          this.tableData = res.data
        }
      })
    },
    //添加用户
    addCollectorUser() {
      this.axios
        .post(
          "/collector_register",
          `collector_name=${this.addForm.collector_name}
        &collector_pwd=${this.addForm.collector_pwd}
        &collector_phone=${this.addForm.collector_phone}
        &collector_address=${this.addForm.collector_address}`
        )
        .then((res) => {
          console.log(res) & console.log(res.data)
          if (res.data.code == 200) {
            this.dialogVisible = false
            this.$message({
              message: "添加成功",
              type: "success",
            })
            this.addForm = {}
            this.getLists()
          } else {
            this.$message({
              message: "重复插入错误",
              type: "warning",
            })
            this.addForm = {}
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //删除用户数据
    deleteLists() {
      console.log(this.collectorUsersIds)
      this.$confirm("此操作将永久删除这些数据 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        center: true,
      })
        .then(() => {
          let url = `/deleteCollectorUsers`
          let collectorUsersIds = this.collectorUsersIds.toString()
          console.log("Cids", collectorUsersIds)
          collectorUsersIds = `collectorUsersIds=${collectorUsersIds}`
          this.axios.post(url, collectorUsersIds).then((res) => {
            console.log(res)
            if (res.data.code != 200) {
              this.$message({
                type: "error",
                message: "删除失败",
              })
            } else {
              this.getLists()
              this.$message({
                type: "success",
                message: "删除成功",
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
    onSubmitSearch() {
      //查询操作
      if (this.search) {
        let url = `/v1/search/${this.search}`
        this.axios
          .get(url)
          .then((res) => {
            console.log(res)
            this.tableData = Array.prototype.concat([], res.data)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.getLists()
      }
    },
    //修改数据
    updateCollectorUsersShuju() {
      let url = `/updateCollectorUser/${this.collectorUsers.collector_id}/${this.collectorUsers.collector_name}/${this.collectorUsers.collector_phone}/${this.collectorUsers.collector_address}`
      this.axios.get(url).then((res) => {
        console.log(res)
        console.log(res.data)
        if (res.data.code == 200) {
          this.updateCollectorUsers = false
          this.$message({
            message: "修改成功",
            type: "success",
          })
          this.updateCollectorUsers = false
          this.getLists()
        } else {
          this.$message({
            message: "修改失败",
            type: "error",
          })
        }
      })
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
    this.getLists(), this.windowHeight()
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
