// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "huayou-pro-j2b38"
})

// 云函数入口函数
exports.main = async (event, context) => {
  let src=event.src
  await wx.cloud.database().collection("image").add({
    data:{
      img:src
    }
  }).then((res)=>{
    console.log(res)
  })
}