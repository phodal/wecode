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
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          code: '',
          isUploading: true,
          files: res.tempFilePaths[0]
        });
        that.drawCanvas();
      }
    })
  },
  drawCanvas: function () {
    const ctx = wx.createCanvasContext('attendCanvasId');
    let that = this;
    wx.getImageInfo({
      src: that.data.files,
      success: function (res) {
        if (res.width > 500 || res.height > 500) {
          let scale = res.width / res.height
          that.setData({
            canWidth: 500,
            canHeight: 500 / scale
          })
          ctx.drawImage(that.data.files, 0, 0, that.data.canWidth, that.data.canHeight);
          ctx.draw();
          var st = setTimeout(function () {
            that.prodImageOpt();
            clearTimeout(st);
          }, 3000);
        } else {
          that.uploadFileOpt(that.data.files);
        }
      }
    })
  },

  prodImageOpt: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        that.uploadFileOpt(res.tempFilePath);
      },
    });
  },

  uploadFileOpt: function (path) {
    var that = this;
    wx.uploadFile({
      url: 'https://code.wdsm.io/upload',
      filePath: path,
      name: 'file',
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
