// pages/ai/ai.js
Page({
  data: {
    canWidth: null,
    canHeight: null,
    files: null,
    isUploading: false,
    code: null
  },
  chooseImage: function (e) {//上传照片
    var that = this;
    wx.chooseImage({
      count: 1,//最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          code: '',
          isUploading: true,
          files: res.tempFilePaths[0]
        });
        that.drawCanvas();
      }
    })
  },
  drawCanvas: function () {  // 缩放图片
    const ctx = wx.createCanvasContext('attendCanvasId');
    let that = this;
    wx.getImageInfo({
      src: that.data.files,
      success: function (res) {
        if (res.width > 500 || res.height > 500) {//判断图片是否超过500像素
          let scale = res.width / res.height//获取原图比例
          that.setData({//构造画板宽高
            canWidth: 500,
            canHeight: 500 / scale
          })
          //画出压缩图片
          ctx.drawImage(that.data.files, 0, 0, that.data.canWidth, that.data.canHeight);
          ctx.draw();
          //等待压缩图片生成
          var st = setTimeout(function () {
            that.prodImageOpt();
            clearTimeout(st);
          }, 3000);
        } else {
          //上传图片
          that.uploadFileOpt(that.data.files);
        }
      }
    })
  },

  prodImageOpt: function () {// 获取压缩图片路径
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        // 上传图片
        that.uploadFileOpt(res.tempFilePath);
      },
    });
  },

  uploadFileOpt: function (path) {//上传图片
    var that = this;
    wx.uploadFile({
      url: 'https://code.wdsm.io/upload', //后台上传api路径
      filePath: path,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        let textDetections = JSON.parse(res.data)['TextDetections'];
        let code = '';

        for (let i = 0; i < textDetections.length; i++) {
          let textDetection = textDetections[i];
          if (textDetection.Type === 'LINE') {
            code = code + textDetection.DetectedText + '\n';
          }
        }

        that.setData({
          code: code,
          isUploading: false
        });
      },
      fail: e => {
        //to do
      }
    })
  },
  copyCode: function () {
    let that = this;
    wx.setClipboardData({
      data: that.data.code,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            });
          }
        })
      }
    })
  }
})
