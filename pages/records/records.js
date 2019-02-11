// pages/records/records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[],
    titles: ["日期", "姓名", "电话", "牙类", "牙位", "收费", "加工费"]
  },
  goDetail:function(params){
    const recordId = params.currentTarget.dataset.rid
    wx.navigateTo({
      url: '../detail/detail?rId='+recordId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.request({
      url: 'https://father.qinglanjun.com/records/',
      success:function(res){
         that.setData({records:res.data.records})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})