const app = getApp();
const util = require('../../utils/util.js');

// pages/create.js
Page({
  data: {
    htmlCode: '',
    originCode: '',
    title: '',
    focus: false,
    value: '',
    codeId: '',
    openid: '',
    isCurrentUser: false,
    height: '' //data里面增加height属性
  },
  onShow: function () {
    let that = this;

    let openid = wx.getStorageSync('openid');
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    } else if (openid) {
      this.setData({
        openid: openid
      })
    } else {

      wx.showLoading({
        title: '登录中...',
      })
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
                that.setData({
                  openid: res.data.openid
                })
              },
              complete: function() {
                wx.hideLoading();
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }

    let id = "#textareawrap";
    let query = wx.createSelectorQuery();//创建查询对象
    query.select(id).boundingClientRect();//获取view的边界及位置信息
    query.exec(function (res) {
      that.setData({
        height: res[0].height + "px"
      });
    });

    try {
      var draft_code = wx.getStorageSync('draft_code');
      if (draft_code) {
        draft_code = JSON.parse(draft_code);
        if (draft_code.title) {
          this.setData({
            codeId: draft_code.id,
            title: draft_code.title,
            isCurrent: this.data.openid === draft_code.userId
          });
        }
        this.setData({
          originCode: util.clearCode(draft_code.code)
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  emptyTextArea: function (e) {
    this.setData({
      originCode: ''
    })
    wx.removeStorageSync("draft_code");
  },
  bindKeyInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  capture: function (e) {
    wx.navigateTo({
      url: '/pages/ai/ai'
    })
  },
  bindFormSubmit: function (e) {
    var that = this;
    //发起网络请求
    if (!this.data.title || !e.detail.value.textarea) {
      return wx.showModal({
        title: '提示',
        content: '请填写标题或者代码',
        success: function (res) {

        }
      })
    }
    wx.showLoading({
      title: '创建中',
    })
    let requestUrl = 'https://code.wdsm.io/';
    if (this.data.codeId !== '' && this.data.isCurrent) {
      requestUrl = 'https://code.wdsm.io/code/' + this.data.codeId
    }

    wx.request({
      url: requestUrl,
      method: 'POST',
      data: {
        title: this.data.title,
        user_id: app.globalData.openid,
        code: `\`\`\`\n${e.detail.value.textarea}\n\`\`\``
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          return wx.showModal({
            title: '创建失败',
            content: JSON.stringify(error)
          })
        }
        wx.removeStorageSync("draft_code");
        wx.navigateTo({
          url: '/pages/code/code?rowId=' + res.data.id
        })
        that.setData({
          title: '',
          originCode: ''
        })
      },
      fail: function (error) {
        return wx.showModal({
          title: '创建失败',
          content: JSON.stringify(error)
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '来，一起看看这行代码',
      path: '/pages/create/create',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});
