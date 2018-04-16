const app = getApp()
const WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js');

Page({
  data: {
    pageTitle: null,
    data: null,
    id: null,
    time: null,
  },
  setTime: function(t) {
    console.log(t.createdAt)
    this.setData({
      time: util.formatTime(new Date(t.createdAt))
    })
  },
  unEntity: function (str) {
    return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  },
  requestCode: function (options) {
    var that = this;
    wx.request({
      url: `https://code.wdsm.io/code/${options.rowId}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (!res.data[0] || !res.data[0].code) {
          return;
        }
        that.setPageTitle(res.data[0].title)
        let data = res.data[0].code;
        WxParse.wxParse('article', 'html', data, that, 5);
        that.setData({
          data: data
        });
        that.setTime(data);
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
      title: title,
      success: function () {

      },
      complete: function () {

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
      if (current_code && current_code.id === options.rowId) {
        WxParse.wxParse('article', 'html', current_code.code, that, 5);
        this.setPageTitle(current_code.title)
        this.setData({
          data: current_code
        })
        this.setTime(current_code);
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
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
