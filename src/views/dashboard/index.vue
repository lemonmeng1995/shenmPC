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
         <!-- <el-date-picker
      v-model="scope.row.data"
      type="date"
      placeholder="Pick a day">
    </el-date-picker> -->
        <el-date-picker
      v-model="scope.row.dataxufei"
      ref="val"
      type="date"
      @change="handleEdit(scope.$index, scope.row)"
      placeholder="选择日期">
    </el-date-picker>
      </template>
    </el-table-column>

     <el-table-column
     label="二维码">
      <template slot-scope="scope">
        <img class="pic-404__parent" src="@/assets/erweima.png"  style="width: 30px; height: 30px" @click="handleGeterwei(scope.$index,scope.row)">
         <!-- <el-image
      style="width: 100px; height: 100px"
      src="@/assets/erweima.png" 
      :fit="fit"></el-image> -->
      </template>
    </el-table-column>

      <el-table-column
     label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">确认</el-button>
         <el-button
          @click.native.prevent="deleteRow(scope.$index, scope.row)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
  title="个人名片二维码"
  :visible.sync="dialogVisible"
  width="30%"
 >
  <div class="qrCode" id="qrcode" ref="qrcode" :style="{width:150+'px',height:150+'px',margin:'auto'}"></div> 
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
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
       dialogVisible:false,
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
    this.getData()
   

  },
  methods:{
    deleteRow(index, row){
       let params = new FormData()
      params.append("customerNo",row.customerNo)
       this.$axios({
            url:this.$api.apis.deleteUserInfo,
            method:"post",
            data:params,
            headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
                // 'Content-Type': 'application/json'               
              }

          }).then(res => { 
           
            if(res.data.errCode == "0000"){
                 this.getData()
                 this.$message({
                message: '删除成功！',
                type: 'success'
              });

            }
          

          })

    },
    getData(){
        this.$axios({
            url:this.$api.apis.selectUserInfo,
            method:"get",
            headers: {
                // 'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
                'Content-Type': 'application/json'               
              }

          }).then(res => {      
              if(res.data.errCode =="0000"){ 
                this.tableDataUrl = res.data.data
                this.tableDataUrl.forEach((item,index) => {
                   const d = new Date(item.duTime)
                 const resDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate()
                 item.duTime = resDate
                  item.xufeibiao = "300/年"
                  item.dataxufei = ""
                  // item.erweiImage = "@/assets/404_images/404.png"
                })  
              }else{
                Toast(res)
              }
          }).catch(() => {
           console.log("cuowu")
          })

    },
    handleGeterwei(index, row){
      this.dialogVisible = true
       let shareUrl = "http://www.shenmaguanggao.top"
        setTimeout(() => {
                document.getElementById("qrcode").innerHTML = "";
                let customerNoLin = row.customerNo
              this.qrCode(`${shareUrl}/home?customerNo=${customerNoLin}`)
                // this.qrCode(`是我的呀`)
            }, 500);
    },
         //转二维码
      qrCode (url) {
          let qrcode = new QRCode('qrcode', {
              width: 150, //图像宽度
              height: 150, //图像高度
              colorDark : "#000000", //前景色
              colorLight : "#ffffff", //背景色
              correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
          })
          qrcode.clear() //清除二维码 
          qrcode.makeCode(url) //生成另一个新的二维码
             setTimeout(() => {
                // this.toImage()
            }, 20);
      },
        //关闭二维码的
        closePopup(){
            this.showqrCode = !this.dialogVisible;
        document.body.style.overflow = 'inherit';
     

        },
    getSearch(){
         this.$axios({
            url:this.$api.apis.selectUserInfo +`?phoneNum=${this.phoneNum}`,
            method:"get",
            data:{phoneNum:this.phoneNum},
            headers: {
                // 'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
                'Content-Type': 'application/json'               
              }

          }).then(res => {      
           
              if(res.data.errCode =="0000"){ 
                this.tableDataUrl = res.data.data
                this.tableDataUrl.forEach((item,index) => {
                  item.xufeibiao = "300/年"
                  item.dataxufei = ""
                  const d = new Date(item.duTime)
                 const resDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate()
                 item.duTime = resDate
                }) 
              }else{
                Toast(res)
              }
          }).catch(() => {
           console.log("cuowu")
          })
    },
    handleClick(index, row){
    this.$axios({
            url:this.$api.apis.updateUserInfo,
            method:"post",
            data:{customerNo:row.customerNo,duTime:this.tableDataUrl[index].dataxufei },
            headers: {
                // 'Content-Type': 'multipart/form-data; charset=utf-8'   //form data 格式请求头
                'Content-Type': 'application/json'               
              }
          }).then(res => {       
              if(res.data.errCode =="0000"){ 
                  // this.tableDataUrl[index].duTime = this.tableDataUrl[index].dataxufei      
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
