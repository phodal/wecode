const app = getApp()
const WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    pageTitle: null,
    id: null
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
        this.setPageTitle(res.data.title)
        let data = res.data.code[0].replace('<pre><code>', '<pre>').replace('</code></pre>', '</pre>');
        WxParse.wxParse('article', 'html', data, that, 5);
      }
    })
  },
  setPageTitle: function (title) {
    if (!title) {
      return;
    }
    this.setData({
      pageTitle: title
    })
    wx.setNavigationBarTitle({
      title: title ,
      success:function(){

      },
      complete:function(){

      }
    });
  },
  onLoad: function (options) {
    if (!options.rowId) {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
    this.setData({
      id: options.rowId
    })
    var that = this;
    try {
      var current_code = wx.getStorageSync('current_code');
      current_code = JSON.parse(current_code);
      console.log(current_code.id,options.rowId)
      if (current_code && current_code.id === options.rowId) {
        let data = current_code.code.replace('<pre><code>', '<pre>').replace('</code></pre>', '</pre>');
        WxParse.wxParse('article', 'html', data, that, 5);
        this.setPageTitle(current_code.title)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '今日代码：' + this.data.pageTitle,
      path: '/pages/code/code?rowId=' + this.data.id,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
