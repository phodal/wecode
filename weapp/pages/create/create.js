const app = getApp()
const WxParse = require('../../wxParse/wxParse.js');

// pages/create.js
Page({
  data: {
    htmlCode: '',
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
    var that = this;
    //发起网络请求
    wx.request({
      url: 'https://code.wdsm.io/',
      method: 'POST',
      data: {
        user_id: app.globalData.openid,
        code: '```\n' + e.detail.value.textarea + '\n```'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        WxParse.wxParse('code', 'html', res.data.code, that, 5);
      }
    })

  }
})
