// pages/search_result/seach_result.js
var share_text = ""
var search_text = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_text:"",
    isDisease:false,
    error_code:true,
    image: "",
    
    pname:"",
    other_name:"",
    parea:"",
    pnutrition:"",
    ptime:"",

    darea:"",
    dcondition:"",
    dconsequence:"",
    dlocation:"",
    dname:"",
    dsymptom:"",
    dtreatment:"",
    other_name:"",
    dobject:"",

    loading_hide:false,

    

  },
  onShareAppMessage: function () {
    return {
      title: 'deebug农作物专家',
      path: '/pages/search_result/search_result?search_text='+share_text,
    }
  },

  back_to_home: function(){
    console.log("back_to_home")
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    /** 
     * 获取系统信息 
     */
    console.log(options.search_text)
    search_text = options.search_text
    console.log(search_text)
    wx.request({
      url: 'https://deebug.gluco.cn/api/v0/pd_search', //仅为示例，并非真实的接口地址
      data: {
        'keywords': search_text,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        self.setData({
          loading_hide:true
        })
        console.log(res.data.error_code)
        if(res.data.error_code==1){
          console.log("error_code==1")
          self.setData({
            error_code:true
          })
        }else{
          self.setData({
            error_code: false
          })
          console.log(res.data)
          console.log(res.data.type)
          var json_data = res.data
          var p_or_d = json_data.type
          var result = res.data.result
          if (res.data.type == "plant") {

            self.setData({
              isDisease: false,
              pname: result.pname,
              image: "https://deebug.gluco.cn" + result.image,
              other_name: result.other_name,
              parea: result.parea,
              pnutrition: result.pnutrition,
              ptime: result.ptime
            })
          }
          if (res.data.type == "disease") {
            console.log("hahahahha")
            console.log(result.dname)
            self.setData({
              image: "https://deebug.gluco.cn" + result.image,
              isDisease: true,
              darea: result.darea,
              dcondition: result.dcondition,
              dconsequence: result.dconsequence,
              dlocation: result.dlocation,
              dname: result.dname,
              dsymptom: result.dsymptom,
              dtreatment: result.dtreatment,
              other_name: result.other_name,
              dobject:result.dobject,
            })
          }

        }

        
        
      }
    })

  
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
  
  },
  goto_bug: function(){
    console.log(1)
    wx.switchTab({
      url: '/pages/list/list',
    })
  }
})