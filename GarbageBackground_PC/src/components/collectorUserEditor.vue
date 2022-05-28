<template>
  <el-dialog
     title="修改回收员用户"
     :visible.sync="dialogVisible"
     width="60%"
     :before-close="handleClose"
  >
      <el-form
        label-width="100px"
        :model="editorForm"
        ref="editorForm"
      >
        <el-form-item label="回收员名称">
            <el-input v-model="editorForm.collector_name" />
        </el-form-item>
        <el-form-item label="回收员密码">
          <el-input v-model="editorForm.collector_pwd" />
        </el-form-item>
        <el-form-item label="回收员电话">
          <el-input v-model="editorForm.collector_phone" />
        </el-form-item>
        <el-form-item label="回收员地址">
          <el-input v-model="editorForm.collector_address" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="editorCollectorUser">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>

export default {
    data(){
        return{
            dialogVisible:false,
            editorForm:{
                collector_name:"",
                collector_pwd:"",
                collector_phone:"",
                collector_address:""
            },
            currentData:""
        }
    },
    mounted(){
      this.$bus.$on("onEditorEvent",row=>{
        this.dialogVisible=true;
        this.currentData=row;
      })
      this.getLists()
    },
    methods:{
        handleClose(done){
        this.$confirm('确认关闭?')
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
        //修改回收员用户
        editorCollectorUser(){
          this.axios.post('/v1/update',`collector_name=${this.editorForm.collector_name}&collector_pwd=${this.editorForm.collector_pwd}&collector_phone=${this.editorForm.collector_phone}&collector_address=${this.editorForm.collector_address}`).then(res=>{
            console.log(res);
            console.log(res.data)
            if(res.data.code==200){
              this.dialogVisible=false
              this.$message({
                message: "修改成功",
                type: "success",
              })
              this.editorForm={}
              this.getLists()
            }else{
              this.$message({
                message:"重复插入错误",
                type:"warning"
              })
              this.editorForm={}
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