// miniprogram/pages/store/store.js
Page({


  data: {
    show: false,
    goodsImg: null,
    goodsName: null,
    goodsCount: null,
    count: 123,
    compute: 1,
    expend: 0,
    buttons: [{
      text: "取消兑换"
    }, {
      text: '兑换'
    }],
    stores: [{
        name: 'iphone11 Max',
        src: "../../images/store/goods1.jpg",
        count: 99999
      },
      {
        name: '华为电视',
        src: "../../images/store/goods2.jpg",
        count: 10000
      },
      {
        name: 'kindle',
        src: "../../images/store/goods3.jpg",
        count: 88888
      },
      {
        name: 'playStation4',
        src: "../../images/store/goods4.jpg",
        count: 99999
      },
      {
        name: 'iWatch5',
        src: "../../images/store/goods5.jpg",
        count: 10000
      },
      {
        name: 'beats耳机',
        src: "../../images/store/goods6.jpg",
        count: 123456
      }
    ]
  },
  openConfirm(e) {
    //e.currentTarget.dataset.item
    console.log(e)
    this.setData({
      goodsImg: e.currentTarget.dataset.item.src,
      goodsName: e.currentTarget.dataset.item.name,
      goodsCount: e.currentTarget.dataset.item.count,
      show: true,
      expend: e.currentTarget.dataset.item.count,
      compute:1
    })
  },
  tapDialogButton(e) {
    this.setData({
      show: false
    })
    if (e.detail.index === 1) {
      wx.showToast({
        title: '兑换成功',
        icon: 'success'
      })
    }
  },
  sub(e) {
    console.log(e)
    if (this.data.compute <= 1) {
      return
    }
    this.setData({
      compute: this.data.compute - 1,
    })
    this.setData({
      expend:this.data.goodsCount*this.data.compute
    })
  },
  add() {
    this.setData({
      compute: this.data.compute + 1,
    })
    this.setData({
      expend: this.data.goodsCount * this.data.compute
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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