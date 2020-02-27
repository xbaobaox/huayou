Page({
  data: {
    img: [],
    count: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {

    wx.getStorage({
      key: 'like',
      success: res => {
        console.log(JSON.parse(res.data))
        this.setData({
          img: JSON.parse(res.data).reverse(),
          count: JSON.parse(res.data).length
        })
      },
    })

  },
  detailData(e) {
    wx.navigateTo({
      url: '../detail/detail?good_detail=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(this.data.img)
    wx.setNavigationBarTitle({
      title: '我的点赞' + (this.data.count)
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