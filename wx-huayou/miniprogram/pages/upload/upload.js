// miniprogram/pages/upload/upload.js
Page({
  data: {
    fileID: null,
    webID:null,
    files: null,
    time: null,
    success: '上传成功',
    error: '上传失败,请检查网络',
    radio: [{
        name: 'jp',
        value: '日系',
        checked: "true"
      },
      {
        name: 'real',
        value: '写实'
      },
      {
        name: 'evm',
        value: '场景',
      },
      {
        name: '3d',
        value: '3D'
      },

      {
        name: "q",
        value: 'Q版'
      },
      {
        name: "other",
        value: '其他'
      }
    ],
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
  },
  uploadFile(files) {
    console.log('upload files', files)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          urls: files.tempFilePaths
        })
      }, 500)

    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
    let D = new Date()
    let that = this;
    wx.cloud.uploadFile({
      cloudPath: D.getTime() + 'image.jpg',
      filePath: e.detail.urls[0],
      success: res => {
        this.setData({
          fileID: res.fileID,
          time: D,
          webID: e.detail.urls[0]
        })
        console.log(this.data.webID)
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  formSubmit: function(e) {
    console.log(this.data.fileID)
    if (!e.detail.value.name ) {
      wx.showToast({
        title: '请输入作品名称',
        icon: 'none',
        image: '../../images/icon/warn.png'
      })
      return
    }
   
    if (!e.detail.value.author ) {
      wx.showToast({
        title: '请输入作者姓名',
        icon: 'none',
        image: "../../images/icon/warn.png"
      })
      return
    }
    if(!this.data.fileID){
      wx.showToast({
        title: '请上传图片,或等待图片上传完毕',
        icon: 'none',
        image: "../../images/icon/warn.png"
      })
      return
    }
    wx.showLoading({
      title: '提交中'
    })
    const db = wx.cloud.database()
    db.collection("image").add({
      data: {
        author: e.detail.value.author,
        name: e.detail.value.name,
        src: this.data.fileID,
        type: e.detail.value.type,
        time: this.data.time,
        webID:this.data.webID
      }
    }).then(res => {
      wx.hideToast()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000
      })
      this.setData({

      })

    }).catch(res => {
      this.setData({
        showFailUpdata: true,
      })
    })
  },
  formReset: function() {
    this.setData({
      fileID: ''
    })
    return console.log("重置")
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uploadFile: this.uploadFile.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})