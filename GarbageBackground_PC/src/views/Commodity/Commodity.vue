<!-- 用户管理 -->
<template>
  <div>
    <!-- 导航栏区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 顶部收索框 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <span>搜索: </span>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="请输入用户姓名"
            v-model="queryInfo.name"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="请输入有效信息"
            v-model="queryInfo.info"
            clearable
          >
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="searchUser"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="2" class="addBtn">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" stripe border>
        <el-table-column
          align="center"
          prop="client_id"
          label="id"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          label="商品名"
          width="120"
          prop="nickname"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="client_name"
          label="商品名"
          width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="client_phone"
          label="手机号"
          width="170"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="client_address_id"
          label="默认地址"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="money_amoun"
          label="环保金额"
          width="100"
        >
        </el-table-column>
        <el-table-column align="center" prop="integral" label="积分" width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="recycle_count"
          label="回收次数"
          width="100"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑商品"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="small"
                icon="el-icon-setting"
                @click="editBtn(scope.row)"
                >编辑</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除商品"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="deleteUser(scope.row)"
                >删除</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="编辑商品"
      :visible.sync="editDialogVisible"
      width="20%"
      @close="editDialogClose"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="商品名" prop="client_name">
          <el-input v-model="editForm.client_name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="client_phone">
          <el-input v-model="editForm.client_phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="client_address_id">
          <el-input v-model="editForm.client_address_id"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="编辑商品"
      :visible.sync="addDialogVisible"
      width="20%"
      @close="addDialogClose"
    >
      <el-form :model="addUserFrom" ref="addUserFrom" label-width="70px">
        <el-form-item label="商品名" prop="client_name">
          <el-input
            v-model.trim="addUserFrom.client_name"
            :minlength="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model.trim="addUserFrom.nickname"
            :minlength="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="client_phone">
          <el-input
            v-model.trim="addUserFrom.client_phone"
            minlength="11"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="client_pwd">
          <el-input
            v-model.trim="addUserFrom.client_pwd"
            minlength="6"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Users",
  created() {
    this.getUserList();
  },
  data() {
    return {
      queryInfo: {
        name: "",
        info: "",
      },
      // 获取商品列表的总数量
      userList: [],
      total: 0,
      // 修改的商品信息
      editForm: {
        client_id: "",
        client_name: "",
        nickname: "",
        client_phone: "",
        client_address_id: "",
      },
      addUserFrom: {
        client_name: "",
        nickname: "",
        client_phone: "",
        client_pwd: "",
      },
      // 对话框的显示和隐藏
      addDialogVisible: false,
      editDialogVisible: false,

      currentPage: 1,
    };
  },
  methods: {
    //对话框关闭的回调
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    addDialogClose() {
      this.$refs.addUserFrom.resetFields();
    },
    async getUserList() {
      let url = "/users";
      let { data } = await this.axios.get(url);
      if (data.code === 200) {
        this.total = data.data;
        this.changePage(this.currentPage);
      } else {
        this.$message({
          message: "获取商品列表失败",
          type: "warning",
        });
      }
    },

    async searchUser() {
      let name = this.queryInfo.name;
      if (this.queryInfo.info) {
        this.$message("暂时只支持商品查询");
        this.queryInfo.info = "";
      }
      if (!name) {
        return this.$message({
          type: "warning",
          message: "请输入商品名!",
        });
      }

      const { data } = await this.axios.get(`/searchUser/${name}`);
      if (data.code === 200) {
        this.userList = data.data;
        this.total = 1;
        this.$message({
          type: "success",
          message: "查询成功!",
        });
      } else {
        this.$message({
          type: "error",
          message: data.message,
        });
      }
    },
    editBtn(row) {
      this.editForm = Object.assign(this.editForm, row);
      this.editDialogVisible = true;
    },
    // 修改商品信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改商品信息请求
        const { data } = await this.axios.post("/editUser", this.editForm);
        if (data.code !== 200)
          return this.$message({
            type: "error",
            message: data.message,
          });
        this.$message.success("更新商品信息成功");
        this.changePage(this.currentPage);
        this.editDialogVisible = false;
      });
    },

    addUser() {
      this.$refs.addUserFrom.validate(async (valid) => {
        if (!valid) return;
        let f = this.addUserFrom;
        if (!f.nickname || !f.client_name || !f.client_phone || !f.client_pwd)
          return this.$message("请填写完整表单信息!");
        const { data } = await this.axios.post("/addUser", this.addUserFrom);
        if (data.code !== 200) {
          return this.$message({
            type: "error",
            message: data.message,
          });
        }
        this.$message.success("添加用户成功!");
        this.changePage(this.currentPage);
        this.addDialogVisible = false;
      });
    },
    // 删除商品
    deleteUser(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const { data } = await this.axios.get(
              `/deleteUser/${row.client_id}`
            );
            if (data.code == 200) {
              await this.changePage(this.currentPage);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              return this.$message({
                message: data.message,
                type: error,
              });
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async changePage(pageNum) {
      this.currentPage = pageNum;
      const { data } = await this.axios.post("/page", { page: pageNum });
      if (data.code === 200) {
        this.userList = data.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 30px;
}
.el-row {
  line-height: 50px;
  margin-bottom: 20px;
}
.el-table .el-table-column .cell {
  text-align: center !important;
}

.el-pagination {
  margin-top: 20px;
}
</style>
