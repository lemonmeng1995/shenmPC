<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="dashboard-searchdiv">
       <span class="dashboard-searchspan">查询账户：</span>
       <el-input placeholder="请输入内容" v-model="phoneNum" class="input-with-select">
  
       <el-button slot="append" icon="el-icon-search" @click="getSearch"></el-button>
      </el-input>
    </div>

      <el-table
    :data="tableDataUrl"
    stripe
    style="width: 100%">
    <el-table-column
      prop="duTime"
      label="到期时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="xufeibiao"
      label="续费选项">
    </el-table-column>
      <el-table-column
      prop="dataxufei"
      label="续费日期">
      <template slot-scope="scope">
         <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
        <el-date-picker
      v-model='dutdata'
      ref="val"
      type="date"
      @change="handleEdit(scope.$index, scope.row)"
      placeholder="选择日期">
    </el-date-picker>
      </template>
    </el-table-column>
      <el-table-column
     label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">确认</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
       phoneNum:'',
       tableDataUrl:[],
       dutdata:"",
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  created(){
    //  this.$axios({
    //         url:this.$api.apis.selectUserInfo,
    //         method:"get",
    //         headers: {
    //             // 'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
    //             'Content-Type': 'application/json'               
    //           }

    //       }).then(res => {
           
    //           console.log("res************",res)
    //           if(res.data.errCode =="0000"){ 
    //             this.tableDataUrl = res.data.data
    //             this.tableDataUrl.forEach((item,index) => {
    //               item.xufeibiao = "300/年"
    //               item.dataxufei = ""
    //             })
                
               
                
    //           }else{
    //             Toast(res)
    //           }
    //       }).catch(() => {
    //        console.log("cuowu")
    //       })

  },
  methods:{
    getSearch(){
      console.log("phoneNum",this.phoneNum)
         this.$axios({
            url:this.$api.apis.selectUserInfo +`?phoneNum=${this.phoneNum}`,
            method:"get",
            data:{phoneNum:this.phoneNum},
            headers: {
                // 'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
                'Content-Type': 'application/json'               
              }

          }).then(res => {
           
              console.log("res************",res)
              if(res.data.errCode =="0000"){ 
                this.tableDataUrl = res.data.data
                this.tableDataUrl.forEach((item,index) => {
                  item.xufeibiao = "300/年"
                  item.dataxufei = ""
                })
                
               
                
              }else{
                Toast(res)
              }
          }).catch(() => {
           console.log("cuowu")
          })

    },
    handleClick(index, row){
      console.log("status",status,this.dutdata, this.tableDataUrl[index].dataxufei)
    
    this.$axios({
            url:this.$api.apis.updateUserInfo,
            method:"post",
            data:{customerNo:row.customerNo,duTime:this.tableDataUrl[index].dataxufei },
            headers: {
                // 'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
                'Content-Type': 'application/json'               
              }

          }).then(res => {
           
              console.log("res************",res)
              if(res.data.errCode =="0000"){ 
                  this.tableDataUrl[index].duTime = this.tableDataUrl[index].dataxufei
           
                  this.$message({
          message: '续费成功！',
          type: 'success'
        });
               
                
              }else{
                Toast(res)
              }
          }).catch(() => {
           console.log("cuowu")
          })

    },
    handleEdit(index, row) {
       
        const d = new Date(this.dutdata)
        const resDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate()
       console.log(index, row,this.$refs,this.$refs.val,this.dutdata,resDate);
      //  this.tableDataUrl[index].duTime = resDate
       this.tableDataUrl[index].dataxufei = resDate
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
   &-searchdiv{
       width:30%;
       display: flex;
       margin-bottom: 20px;   
  }
    &-searchspan{
      display: inline-block;
      width:20%;
      line-height: 40px;

       }
  &el-input-group{
    width:30%;

  }
}
</style>
