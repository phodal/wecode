//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    codes: [],
    isLoading: false
  },
  onLoad: function () {
    this.getFeaturesCode();
  },
  onPullDownRefresh: function () {
    this.getFeaturesCode();
  },
  onItemClick: function (e) {
    let rowId = e.currentTarget.dataset.rowId;
    let id = e.currentTarget.dataset.id;
    // console.log(this.data.codes, id, rowId)
    wx.setStorageSync("current_code", JSON.stringify(this.data.codes[id]))
    wx.navigateTo({
      url: '/pages/code/code?rowId=' + rowId
    })
  },
  getFeaturesCode: function () {
    var that = this;
    this.setData({
      isLoading: true
    });
    wx.request({
      url: 'https://code.wdsm.io/features',
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
