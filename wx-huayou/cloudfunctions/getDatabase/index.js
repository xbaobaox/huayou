// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "huayou-pro-j2b38",
})
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  // return db.collection("image").limit(1000).get()
  console.log('event:' + event, 'context:' + context)
  return db.collection("image").where({
    type: event.type
  }).skip(event.count).limit(10).get()
}