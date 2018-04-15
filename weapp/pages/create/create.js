const app = getApp()

// pages/create.js
Page({
  data: {
    height: 20,
    focus: false
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function (e) {
    //发起网络请求
    wx.request({
      url: 'https://code.wdsm.io/',
      method: 'POST',
      data: {
        user_id: app.globalData.openid,
        code: e.detail.value.textarea
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
      }
    })

  }
})
