const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordId: 0,
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
  onLoad: function(options) {
    const that = this
    const recordId = options.rId
    this.setData({
      recordId: recordId
    })
    wx.request({
      url: this.data.domain + '/records/' + recordId + '/',
      success: function(res) {
        that.setData({
          record: res.data
        })
      }
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

  },
  deleteRecord: function() {
    const rId = this.data.recordId
    const that = this
    const username = getApp().globalData.userInfo.nickName
    wx.showModal({
      title: '删除',
      content: '是否删除记录？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: that.data.domain + '/records/' + that.data.recordId + '/',
            method: "DELETE",
            data: {
              'username': username
            },
            success: function(res) {
              if (res.statusCode === 400) {
                const error = res.data.error
                if (error === "no_user") {
                  wx.showModal({
                    title: '错误',
                    content: '查无此人，请联系开发者要求账号。',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                } else if (error === 'wrong_user') {
                  wx.showModal({
                    title: '错误',
                    content: '只能删除自己创建的记录',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                }
              } else {
                wx.redirectTo({
                  url: '../records/records'
                })
              }

            }
          })
        }
      },

    })
  },
  updateRecord: function(param) {
    const that = this
    const record = param.detail.value
    record.username = getApp().globalData.userInfo.nickName
    wx.request({
      url: that.data.domain + '/records/' + that.data.recordId + '/',
      method: "PUT",
      data: record,
      success: function(res) {
        if (res.statusCode === 400) {
          const error = res.data.error
          if (error === "no_user") {
            wx.showModal({
              title: '错误',
              content: '查无此人，请联系开发者要求账号。',
              showCancel: false,
              confirmText: '知道了'
            })
          } else if (error === 'wrong_user') {
            wx.showModal({
              title: '错误',
              content: '只能修改自己创建的记录',
              showCancel: false,
              confirmText: '知道了'
            })
          } else if (error === 'data_untotal') {
            wx.showModal({
              title: '错误',
              content: '数据不完整，请填写完整的数据',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        } else {
          wx.redirectTo({
            url: '../records/records'
          })
        }
      }
    })
  },
  callPhone:function(param){
    const phone=this.data.record.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      fail:function(res){
        wx.showModal({
          title: '失败',
          content: '请检查号码或授权',
          showCancel:false,
          confirmText:'知道了',
        })
      }

    })
  }

})