// pages/camera/camera.js
var tmp_filePath = " "

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    imgWidth:0,
    imgHeight:0,
    takePhotiVis: true,
    optionVis:false
  },
  

  onReady() {

  },
  reset:function() {
    var self = this
    self.setData({
      takePhotiVis: true,
      optionVis: false,
    })
    tmp_filePath = " "
    console.log(self.data.src)
    self.setData({
      src:" "
    })
    
  },

  takePhoto() {
    var self = this
    const ctx = wx.createCameraContext()
    const platform = wx.getSystemInfoSync().platform
    self.setData({
      takePhotiVis:false,
      optionVis:true,
    })
    //拍照获取图像
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        self.setData({
          src: res.tempImagePath,
        })
        tmp_filePath = res.tempImagePath
        console.log(tmp_filePath)
        //获取图像的信息
        wx.getImageInfo({
          src: self.data.src,
          success: res => {

            self.setData({
              imgWidth: res.width,
              imgHeight: res.height
            })
            console.log(self.data.imgWidth)
            console.log(self.data.imgHeight)
          }
        })
    
      wx.saveImageToPhotosAlbum({
        filePath: tmp_filePath,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
          console.log('fail')
      },
    })         
      }
    })
  },
  confirm: function(){  
    
    if(tmp_filePath==" "){
      wx.showToast({
        title: '未选择好图片哟',
        icon: 'fail',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../result_swiper/result_swiper?tmp_filePath=' + tmp_filePath//qu是上面input输入的值
      })
    }
    
  },

  error(e) {
    console.log(e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})