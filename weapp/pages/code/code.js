const app = getApp()
const WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js');

Page({
  data: {
    pageTitle: null,
    data: null,
    id: null,
    time: null,
    openid: null,
    isCurrent: false,
    isLoading: false
  },
  setTime: function (t) {
    this.isCurrentUser();
    this.setData({
      time: new Date(t.createdAt)
    })
  },
  unEntity: function (str) {
    return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  },
  requestCode: function (options) {
    var that = this;
    this.setData({
      isLoading: true
    });
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
          isLoading: false,
          data: res.data[0]
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
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.data.pageTitle,
      path: '/pages/code/code?rowId=' + this.data.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getCode: function (that) {
    return util.clearCode(that.data.data.code);
  },
  isCurrentUser: function () {
    if (this.data.openid) {
      this.setData({
        isCurrent: this.data.openid === this.data.data.userId
      })
    }
  },
  forkCode: function () {
    wx.setStorageSync("draft_code", JSON.stringify(this.data.data));
    wx.switchTab({
      url: '/pages/create/create'
    })
  },
  deleteCode: function () {
    wx.showLoading({
      title: '刪除中',
    })
    wx.request({
      url: `https://code.wdsm.io/code/${this.data.id}`,
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: app.globalData.openid
      },
      success: function () {
        wx.hideLoading();
        wx.navigateBack();
      },
      fail: function (error) {
        wx.showModal({
          title: '创建失败',
          content: JSON.stringify(error)
        })
      }
    });
  },
  copyCode: function () {
    let that = this;
    wx.setClipboardData({
      data: that.getCode(that),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            });
            console.log(that.getCode(that)) // data
          }
        })
      }
    })
  },
  getCodeId: function () {
    wx.setClipboardData({
      data: '/pages/code/code?rowId=' + this.data.id,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({title: '复制成功', icon: 'success', duration: 1000});}
        })
      }
    })
  },
});
