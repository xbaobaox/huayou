// miniprogram/pages/myCollection/myCollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collData: [],
    count: '',
    slideButtons: [{
      type: "warn",
      text: "删除",
      extClass: "text"
    }]
  },

  /* 删除收藏 */
  clickDel(e) {
    let tempArr = this.data.collData;
    tempArr.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      collData: tempArr,
      count:this.data.collData.length
    })
    wx.setNavigationBarTitle({
      title: '我的收藏' + (this.data.count)
    })
    wx.setStorage({
      key: 'coll',
      data: JSON.stringify(this.data.collData)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getStorage({
      key: 'coll',
      success: res => {
        this.setData({
          collData: JSON.parse(res.data),
          count: JSON.parse(res.data).length
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '我的收藏' + (this.data.count)
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