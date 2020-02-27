// miniprogram/pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    x: 0,
    indexBar: [{
        type: "jp",
        name: '日系',
      },
      {
        type: 'real',
        name: '写实',
      },
      {
        type: 'evm',
        name: '场景',
      },
      {
        type: '3d',
        name: '3D',
      },
      {
        type: 'q',
        name: 'Q版',
      },
      {
        type: 'other',
        name: '其他'
      }
    ],
    imgList: [],
    filterImg: [],
    type: 'jp'
  },
  selected(e) {
    this.setData({
      x: e.currentTarget.dataset.index,
      type: e.currentTarget.dataset.type,
      filterImg: []
    })
    this.getData(e.currentTarget.dataset.type)
  },

  detailData(e) {
    wx.navigateTo({
      url: '../detail/detail?good_detail=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  getData(type) {
    wx.cloud.callFunction({
      name: 'getDatabase',
      data: {
        type: type,
        count: this.data.filterImg.length
      },
      success: res => {
        this.setData({
          filterImg: this.data.filterImg.concat(res.result.data),
          show: !this.data.show
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getData('jp')
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
    this.getData(this.data.type)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})