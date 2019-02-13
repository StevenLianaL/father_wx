const util=require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordId:0,
    record:{
      work_time:util.formatDate(new Date()),
      patient:null,
      phone:null,
      tooth:null,
      position:null,
      price:null,
      other_price:null
    },
    domain: getApp().globalData.domain
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
    const recordId=options.rId
    this.setData({recordId:recordId})
    wx.request({
      url: this.data.domain+'/records/'+recordId+'/',
      success:function(res){
        that.setData({record:res.data})
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

  },
  deleteRecord:function(){
    const that=this
    wx.showModal({
      title: '删除',
      content: '是否删除记录？',
      success:function(res){
        if (res.confirm){
          wx.request({
            url: that.data.domain+'/records/'+that.data.recordId+'/',
            method:"DELETE",
            success:function(res){
              wx.redirectTo({
                url: '../records/records'
              })
            }
          })
        }
      },

    })
  },
  updateRecord:function(param){
    const that=this
    const record=param.detail.value
    console.log(record,'pa')
    wx.request({
      url: that.data.domain+'/records/'+that.data.recordId+'/',
      method:"PUT",
      data:record,
      success: function (res) {
        wx.redirectTo({
          url: '../records/records'
        })
      }
    })
  }

})