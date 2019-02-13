const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: {
      work_time: util.formatDate(new Date()),
      patient: null,
      phone: null,
      tooth: null,
      position: null,
      price: null,
      other_price: null
    },
    domain: getApp().globalData.domain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  addRecord:function(param){
    const that = this
    const record = param.detail.value
    console.log(record, 'pa')
    wx.request({
      url: that.data.domain + '/records/',
      method: "POST",
      data: record,
      success: function (res) {
        console.log(res.data.statusCode)
        if(res.statusCode===404){
          wx.showModal({
            title: '错误',
            content: '数据不完整，请填写完整的数据',
            showCancel:false,
            confirmText:'知道了'
          })
        }
        else{
          console.log('success',res)
          wx.redirectTo({
            url: '../records/records'
          })
        }
      },
    })
  }
})