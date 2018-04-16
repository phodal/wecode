// pages/about/about.js
Page({
  data: {

  },
  copyWechat: function () {
    wx.setClipboardData({
      data: 'phodal-weixin',
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
