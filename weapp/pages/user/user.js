//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    codes: [],
    openId: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (!app.globalData.openid) {
      return;
    }
    this.getFeaturesCode();
  },
  onPullDownRefresh: function () {
    this.getFeaturesCode();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onItemClick: function (e) {
    let rowId = e.currentTarget.dataset.rowId;
    let id = e.currentTarget.dataset.id;
    console.log(this.data.codes, id, rowId)
    wx.setStorageSync( "current_code", JSON.stringify(this.data.codes[id]))
    wx.navigateTo({
      url: '/pages/code/code?rowId=' + rowId
    })
  },
  getFeaturesCode: function () {
    var that = this;
    var userId = app.globalData.openid;
    wx.request({
      url: `https://code.wdsm.io/user/${userId}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          codes: res.data
        })
      }
    })
  }
})
