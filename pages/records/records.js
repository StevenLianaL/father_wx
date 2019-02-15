const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserDetail: true,
    records: [],
    titles: ["日期", "姓名", "电话", "牙类", "牙位", "收费", "加工费"],
    domain: getApp().globalData.domain,
    all_prices: '',
    other_prices: '',
    profit: '',
    isShowSelect: false,
    select: {
      date: util.formatDate(new Date()),
      level: '',
      patient: '',
      tempDate: ''
    },
    levels: [{
        value: 'year',
        show: '年'
      },
      {
        value: 'month',
        show: '月'
      },
      {
        value: 'day',
        show: '日'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // user=getApp().globalData.userInfo.NickName
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                hasUserDetail: true
              })
              // 可以将 res 发送给后台解码出 unionId
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.setData({
            hasUserDetail: false
          })
        }
      }
    })
    wx.request({
      url: this.data.domain + '/records/',
      success: function(res) {
        that.setData({
          records: res.data.records,
          all_prices: res.data.all_prices,
          other_prices: res.data.other_prices,
          profit: res.data.profit
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
  goDetail: function(params) {
    const recordId = params.currentTarget.dataset.rid
    wx.navigateTo({
      url: '../detail/detail?rId=' + recordId,
    })
  },
  addRecord: function(res) {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  showSelect: function(param) {
    var that = this
    let isShow = this.data.isShowSelect
    if (isShow) {
      // time level
      if (this.data.select.level === 'year') {
        this.data.select.tempDate = this.data.select.date.substring(0, 4)
      } else if (this.data.select.level === 'month') {
        this.data.select.tempDate = this.data.select.date.substring(0, 7)
      } else if (this.data.select.level === 'day') {
        this.data.select.tempDate = this.data.select.date
      } else {
        this.data.select.tempDate = ''
      }
      const date = this.data.select.tempDate
      const patient = this.data.select.patient
      const username = getApp().globalData.userInfo.nickName
      if (date !== '' & patient !== '') {
        var query = "?date=" + date + '&patient=' + patient + '&username=' + username
      } else if (patient !== '') {
        var query = "?patient=" + patient + '&username=' + username
      } else if (date !== '') {
        var query = '?date=' + date + '&username=' + username
      } else {
        var query = ''
      }
      wx.request({
        url: that.data.domain + '/records/' + query,
        success: function(res) {

          that.setData({
            records: res.data.records,
            select: {
              date: util.formatDate(new Date()),
              level: '',
              patient: '',
              tempDate: ''
            },
            all_prices: res.data.all_prices,
            other_prices: res.data.other_prices,
            profit: res.data.profit
          })
        }

      })

    }
    this.setData({
      isShowSelect: !isShow
    })
  },
  setPatient: function(param) {
    this.setData({
      select: {
        date: this.data.select.date,
        level: this.data.select.level,
        patient: param.detail.value,
        tempDate: this.data.select.tempDate
      }
    })
  },
  setLevel: function(param) {
    this.setData({
      select: {
        date: this.data.select.date,
        level: param.detail.value,
        patient: this.data.select.patient,
        tempDate: this.data.select.tempDate
      }
    })
  },
  setSelectDate: function(param) {
    this.setData({
      select: {
        date: param.detail.value,
        level: this.data.select.level,
        patient: this.data.select.patient,
        tempDate: this.data.select.tempDate
      }
    })
  },
  getUserInfo: function(e) {
    const that = this
    const app = getApp()
    app.globalData.userInfo = e.detail.userInfo
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                hasUserDetail: true
              })
              // 可以将 res 发送给后台解码出 unionId
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.setData({
            hasUserDetail: false
          })
        }
      }
    })
  }
})