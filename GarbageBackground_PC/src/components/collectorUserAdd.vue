<template>
  <el-dialog
     title="添加回收员用户"
     :visible.sync="dialogVisible"
     width="60%"
     :before-close="handleClose"
  >
      <el-form
        label-width="100px"
        :model="addForm"
        ref="addForm"
      >
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
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="addCollectorUser">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>

export default {
    data(){
        return{
            dialogVisible:false,
            addForm:{
                collector_name:"",
                collector_pwd:"",
                collector_phone:"",
                collector_address:""
            }
        }
    },
    mounted(){
      this.$bus.$on("onAddEvent",flag=>{
        this.dialogVisible=flag;
      })
      this.getLists()
    },
    methods:{
        handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        getLists() {
            let url = `/v1/list`
            this.axios.get(url).then((res) => {
                console.log(res)
                this.tableData=res.data
                if(res.data.status==200){
                    this.tableData=res.data
                }
            })
        },
        //添加用户
        addCollectorUser(){
          this.axios.post('/collector_register',`collector_name=${this.addForm.collector_name}
            &collector_pwd=${this.addForm.collector_pwd}
            &collector_phone=${this.addForm.collector_phone}
            &collector_address=${this.addForm.collector_address}`).then(res=>{
            console.log(res)&
            console.log(res.data)
            if(res.data.code==200){
              this.dialogVisible=false
              this.$message({
                message: "添加成功",
                type: "success",
              })
              this.addForm={}
              this.getLists()
            }else{
              this.$message({
                message:"重复插入错误",
                type:"warning"
              })
              this.addForm={}
            }
          }).catch(error=>{
            console.log(error)
          })
        },
    }
}
</script>

<style scoped>
  .location{
    float:left;
  }
</style>