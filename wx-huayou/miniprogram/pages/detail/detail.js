// miniprogram/pages/detail/detail.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    showLike: true,
    showCollect: false,
    img: [],
    arrStr: [],
    likeArr: [],
    history: [],
    success: '已加入收藏夹',
    successShow: false,
    error: '请勿重复添加',
    errorShow: false
  },
  /* 点赞 */
  clickLike() {
    let tempArr = this.data.likeArr
    console.log(this.data.item.src)
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].src === this.data.item.src) {
        tempArr.splice(i, 1)
        this.setData({
          showLike: !this.data.showLike,
          likeArr: tempArr
        })
        return wx.setStorage({
          key: 'like',
          data: JSON.stringify(this.data.likeArr)
        })
      }
    }
    tempArr.push(this.data.item)
    console.log(tempArr)
    this.setData({
      likeArr: tempArr,
      showLike: !this.data.showLike,
    })
    console.log(this.data.likeArr)
    wx.setStorage({
      key: 'like',
      data: JSON.stringify(this.data.likeArr),
    })
  },

  /* 收藏 */
  clickColl() {
    console.log('我收藏了')
    
    let tempArr = this.data.arrStr

    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].src === this.data.item.src) {
        tempArr.splice(i, 1)
        console.log('删除了收藏')
        this.setData({
          // errorShow: true
          showCollect: !this.data.showCollect,
          arrStr: tempArr
        })
        return wx.setStorage({
          key: 'coll',
          data: JSON.stringify(this.data.arrStr),
        })
      }
    }

    tempArr.push(this.data.item)
    console.log('添加了收藏')
    this.setData({
      arrStr: tempArr,
      // successShow: true
      showCollect: !this.data.showCollect
    })
    wx.setStorage({
      key: 'coll',
      data: JSON.stringify(this.data.arrStr),
    })
  },
  /* 保存 */
  saveImg() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(e) {
              wx.cloud.downloadFile({
                fileID: that.data.item.src,
                success(e) {
                  wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath
                  })
                },
              })
            }
          })
        } else {
          wx.cloud.downloadFile({
            fileID: that.data.item.src,
            success(e) {
              wx.saveImageToPhotosAlbum({
                filePath: e.tempFilePath
              })
            },
          })
        }
      }
    })
  },
  detailData(e) {
    wx.navigateTo({
      url: '../detail/detail?good_detail=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  preview() {
    wx.previewImage({
      urls: [this.data.item.src],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      item: JSON.parse(options.good_detail),
    })
    console.log(this.data.item)
    wx.getStorage({
      key: 'coll',
      success: res => {
        this.setData({
          arrStr: JSON.parse(res.data)
        })
      },
    })
    wx.getStorage({
      key: 'like',
      success: res => {
        this.setData({
          likeArr: JSON.parse(res.data)
        })
      },
    })
    wx.getStorage({
      key: 'history',
      success: res => {
        this.setData({
          history: JSON.parse(res.data)
        })
      },
    })

    wx.cloud.callFunction({
      name: 'moreDatabase',
      data: {
        type: this.data.item.type
      },
      success: res => {
        let tempArr = res.result.data
        // let newArr = []
        // for (let i = 0; i < tempArr.length; ++i) {
        //   let index = Math.floor(Math.random() * tempArr.length)
        //   newArr.push(tempArr[index])
        //   tempArr.splice(index, 1)
        // }
        // let randomArr = [...newArr, ...tempArr]
        tempArr.sort(function() {
          return Math.random() > 0.5 ? -1 : 1
        })
        this.setData({
          img: tempArr
        })
        //res.result.data
        console.log(this.data.img)
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    for (let i = 0; i < this.data.likeArr.length; i++) {
      if (this.data.likeArr[i].src === this.data.item.src) {
        this.setData({
          showLike: false
        })
      }
    }
    for (let i = 0; i < this.data.arrStr.length; i++) {
      if (this.data.arrStr[i].src === this.data.item.src) {
        this.setData({
          showCollect: true
        })
      }
    }
    let tempArr = this.data.history
    for (let i = 0; i < tempArr.length; i++) {
      if (this.data.item.src === tempArr[i].src) {
        return
      }
    }
    tempArr.unshift(this.data.item)
    if (tempArr.length >= 15) {
      tempArr = tempArr.slice(0, 15)
    }
    this.setData({
      history: tempArr
    })
    wx.setStorage({
      key: 'history',
      data: JSON.stringify(this.data.history)
    })
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