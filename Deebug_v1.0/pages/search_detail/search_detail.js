
//获取应用实例
var WxSearch = require('wxSearch.js')

var __keysColor = [];
var __mindKeys = [];

Page({
  data: {
    focus:false,
    wxSearchData:{}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSe12ewdsaarchdata
    WxSearch.init(that, 43, ['番茄', '辣椒疮痂病', '柑桔黄龙病', '番茄晚疫病菌', '柑桔黄龙病', '苹果黑星病', '葡萄褐斑病','樱桃']);
    WxSearch.initMindKeys(['番茄叶霉病', '蓝莓', '番茄斑枯病', '辣椒疮痂病', '葡萄轮斑病', '葡萄', '番茄花叶病毒病', '番茄斑点病', '樱桃', '番茄白粉病', '草莓叶枯病', '玉米锈病', '樱桃白粉病', '苹果雪松锈病', '番茄', '玉米', '番茄早疫病', '桃子疮痂病', '草莓', '马铃薯早疫病', '番茄疮痂病', '番茄红蜘蛛损伤', '玉米花叶病毒病', '马铃薯晚疫病', '番茄黄化曲叶病毒病', '苹果黑星病', '葡萄褐斑病', '桃子', '葡萄黑腐病', '玉米叶斑病', '番茄晚疫病菌', '辣椒', '苹果', '苹果灰斑病', '柑桔', '马铃薯', '柑桔黄龙病', '玉米灰斑病']);
    that.setData({
      focus:true
    })
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    // console.log(that)
    wx.navigateTo({
      url: '/pages/search_result/seach_result?search_text=' + that.data.wxSearchData.value,
    })
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})
