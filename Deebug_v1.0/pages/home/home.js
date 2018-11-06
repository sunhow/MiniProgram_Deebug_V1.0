// pages/home/home.js
var bmap = require('bmap-wx.min.js');
var dic = new Array();      //注意它的类型是Array
dic["雷阵雨"] = "/image/weather/thd.png";
dic["晴"] = "/image/weather/sn.png";
dic["多云"] = "/image/weather/mc.png";
dic["阴"] = "/image/weather/cl.png";
dic["阴转中雨"] = "/image/weather/lr.png";
dic["雷阵雨伴有冰雹"] = "/image/weather/thd.png";
dic["雨夹雪"] = "/image/weather/snw.png";
dic["小雨"] = "/image/weather/lr.png";
dic["中雨"] = "/image/weather/lr.png";
dic["大雨"] = "/image/weather/hr.png";
dic["暴雨"] = "/image/weather/hr.png";
dic["大暴雨"] = "/image/weather/hr.png";
dic["特大暴雨"] = "/image/weather/hr.png";
dic["小雨转中雨"] = "/image/weather/hr.png";
dic["中雨转大雨"] = "/image/weather/hr.png";
dic["大雨转暴雨"] = "/image/weather/hr.png";
dic["暴雨转大暴雨"] = "/image/weather/hr.png";
dic["大暴雨转特大暴雨"] = "/image/weather/hr.png";
dic["小雪转中雪"] = "/image/weather/snw.png";
dic["中雪转大雪"] = "/image/weather/snw.png";
dic["大雪转暴雪"] = "/image/weather/snw.png";
dic["浮尘"] = "/image/weather/fog.png";
dic["扬沙"] = "/image/weather/fog.png";
dic["强沙尘暴"] = "/image/weather/fog.png";
dic["霾"] = "/image/weather/fog.png";
dic["晴转多云"] = "/image/weather/mc.png";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    weather:"",
    temp:"",
    PM:"",
    wind:"",
    sugg:"",
    pic_url:"",
    city:""
  },

  take_photo:function(){
    wx.navigateTo({
      url: '../camera/camera'
    })
  },

  upload_photo:function(){

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.navigateTo({
          url: '../result_swiper/result_swiper?tmp_filePath=' + tempFilePaths
        })
      },
      fail:function(res){
        console.log(res.errMsg)
      }
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#203a2d',
    })

    var that = this;
    // 新建百度地图对象
    var BMap = new bmap.BMapWX({
      ak: 'X0DoBoFAqFKU2uN5XfdxIRGqD9s9r8n9'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      that.setData({
        city: weatherData.currentCity,
        weather: weatherData.weatherDesc,
        temp: weatherData.temperature,
        PM: weatherData.pm25,
        wind: weatherData.wind,
        // pic_url: dic[weatherData.weatherDesc]
      })

      if (dic[weatherData.weatherDesc] == null && weatherData.weatherDesc.indexOf("雨") != -1) {
        that.setData({
          pic_url: '/image/weather/lr.png'
        })
      }

      if (dic[weatherData.weatherDesc] != null){
        that.setData({
          pic_url: dic[weatherData.weatherDesc]
        })
      }
      

      var weather_str = weatherData.weatherDesc
      if (weather_str.indexOf("雨") != -1){
        that.setData({
          sugg:"天气不宜施肥、用药"
        })
      }else{
        that.setData({
          sugg: "天气适宜施肥、用药"
        })
      }
    };
    // 发起weather请求
    BMap.weather({
      fail: fail,
      success: success
    });
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