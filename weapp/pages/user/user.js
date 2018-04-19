//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    codes: [],
    openId: '',
    userInfo: {},
    hasUserInfo: false,
    isLoading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (!app.globalData.openid) {
      return;
    } else {
      this.getFeaturesCode();
    }
  },
  onShow: function () {

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
    wx.setStorageSync( "current_code", JSON.stringify(this.data.codes[id]))
    wx.navigateTo({
      url: '/pages/code/code?rowId=' + rowId
    })
  },
  getUserId: function () {
    wx.setClipboardData({
      data: app.globalData.openid,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({title: '复制成功', icon: 'success', duration: 1000});}
        })
      }
    })
  },
  getFeaturesCode: function () {
    var that = this;
    var userId = app.globalData.openid;
    this.setData({
      isLoading: true
    })
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
      },
      complete: function () {
        wx.stopPullDownRefresh();
        that.setData({
          isLoading: false
        })
      }
    })
  }
})
