const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[],
    titles: ["日期", "姓名", "电话", "牙类", "牙位", "收费", "加工费"],
    domain: getApp().globalData.domain,
    all_prices:'',
    other_prices:'',
    profit:'',
    isShowSelect:false,
    select:{
      date: util.formatDate(new Date()),
      level:'',
      patient:'',
      tempDate:''
    },
    levels:[
      {value:'year',show:'年'},
      {value:'month',show:'月'},
      {value:'day',show:'日'}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.request({
      url: this.data.domain+'/records/',
      success:function(res){
         that.setData({records:res.data.records})
         that.setData({all_prices:res.data.all_prices})
         that.setData({other_prices:res.data.other_prices})
         that.setData({profit:res.data.profit})
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
  goDetail: function (params) {
    const recordId = params.currentTarget.dataset.rid
    wx.navigateTo({
      url: '../detail/detail?rId=' + recordId,
    })
  },
  addRecord:function(res){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  showSelect:function(param){
    var that=this
    let isShow=this.data.isShowSelect
    if(isShow){
      if (this.data.select.level==='year'){
        this.data.select.tempDate=this.data.select.date.substring(0,4)
      }
      else if (this.data.select.level==='month'){
        this.data.select.tempDate = this.data.select.date.substring(0,7) 
      }
      else if (this.data.select.level==='day'){
        this.data.select.tempDate = this.data.select.date
      }
      else{
        this.data.select.tempDate=''
      }
      const date = this.data.select.tempDate
      const patient = this.data.select.patient
      if(date!==''& patient!==''){
        var query="?date="+date+'&patient='+patient
      }
      else if(patient!==''){
        var query="?patient="+patient
      }
      else if (date!==''){
        var query='?date='+date
      }
      else{
        var query=''
      }
      wx.request({
        url: that.data.domain+'/records/'+query,
        success:function(res){
          that.setData({ records: res.data.records })
          that.setData({ all_prices: res.data.all_prices })
          that.setData({ other_prices: res.data.other_prices })
          that.setData({ profit: res.data.profit })
        }
      })

    }
    this.setData({ isShowSelect: !isShow })
  },
  setPatient:function(param){
    this.data.select.patient=param.detail.value
  },
  setLevel:function(param){
    this.data.select.level=param.detail.value
  },
  setSelectDate:function(param){
    this.data.select.date = param.detail.value
  }
})