//app.js
App({
  globalData: {
    screenHeight: null,
    openid: null,
    userInfo: null
  },
  onLaunch: function () {
    var that = this;

    // 登录
    let openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.login({
        success: function(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://code.wdsm.io/login',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                wx.setStorageSync("openid", res.data.openid);
                that.globalData.openid = res.data.openid;
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      that.globalData.openid = openid;
    }
    // 设备信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.screenHeight = res.screenHeight;
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})
