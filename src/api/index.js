import axios from 'axios'
let baseUrl = ""

if (process.env.NODE_ENV == 'development') {  
    console.log("开发模式")
    baseUrl = '/api';   //代理
}else{  
    baseUrl = 'http://www.shenmaguanggao.top/card'; 
}
const apis = {
    getloginapi : baseUrl + '/smUserinfo/isLogin',   // 登录接口
    selectUserInfo: baseUrl + '/smUserinfo/selectUserInfo',
    updateUserInfo: baseUrl + '/smUserinfo/updateUserInfo',
    deleteUserInfo: baseUrl + '/smUserinfo/deleteUserInfo',
 
}
//校验手机号码
function isPoneAvailable(phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
  export default { baseUrl,apis,isPoneAvailable}