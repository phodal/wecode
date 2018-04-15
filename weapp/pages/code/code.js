const app = getApp()
const WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
  },
  requestCode: function (options) {
    wx.request({
      url: `https://code.wdsm.io/code/${options.rowId}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (!res.data.code || !res.data.code[0]) {
          return;
        }
        let data = res.data.code[0].replace('<pre><code>', '<pre>').replace('</code></pre>', '</pre>');
        WxParse.wxParse('article', 'html', data, that, 5);
      }
    })
  }, onLoad: function (options) {
    if (!options.rowId) {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
    var that = this;
    try {
      var current_code = wx.getStorageSync('current_code');
      current_code = JSON.parse(current_code);
      console.log(current_code.id,options.rowId)
      if (current_code && current_code.id === options.rowId) {
        let data = current_code.code.replace('<pre><code>', '<pre>').replace('</code></pre>', '</pre>');
        WxParse.wxParse('article', 'html', data, that, 5);
      } else {
        this.requestCode(options);
      }
    } catch (e) {
      throw new Error(e)
    }

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})
