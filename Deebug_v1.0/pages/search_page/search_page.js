// pages/search_page/search_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  
  SerchFocus:function(){
    wx.navigateTo({
      url: '../search_detail/search_detail',
    })
  },
  pressView: function (e) {
    var viewDataSet = e.target.dataset.text;
    console.log(viewDataSet); //输出点击的view的id，第二种情况就不重复写了
    wx.navigateTo({
      url: '/pages/search_result/seach_result?search_text='+viewDataSet,
    })
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