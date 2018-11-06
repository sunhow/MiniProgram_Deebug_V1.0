var domain_name = "https://deebug.gluco.cn"
var tmp_score = ""
Page({
  data: {
    top1_pname: "",
    top2_pname: "",
    top3_pname: "",
    unknown: "未知",

    top1_disease: "",
    top2_disease: "",
    top3_disease: "",


    top1_image: "",
    top2_image: "",
    top3_image: "",

    top1_score: "%",
    top2_score: "%",
    top3_score: "%",

    top1_rate: "",
    top2_rate: "",
    top3_rate: "",

    top1_index_url:"",
    top2_index_url:"",
    top3_index_url:"",


    winWidth: 0,
    winHeight:0,
    viewHeight:0,

    top1_high:false,
    hiddenmodalput: true,  
    loading_hide:false,
    image_net:false,

    imagenet_name:"",
  },

  onLoad: function (options) {
    var self = this;
    /** 
     * 获取系统信息 
     */
    self.setData({
      tmp_filePath: options.tmp_filePath
    })

    console.log(self.data.tmp_filePath)
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        self.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight * 0.6,
          viewHeight: res.windowHeight
        });
      }

    });

    wx.uploadFile({
      url: 'https://deebug.gluco.cn/api/v0/pd_diagnose',
      filePath: self.data.tmp_filePath,
      name: 'image',
      formData: {
        'user': 'username'
      },
      success: function (res) {
        // console.log(res.data);
        var json_data = JSON.parse(res.data)
        var result = json_data.result
        var error_code = json_data.error_code
        console.log(error_code)
        if (error_code==1){
          console.log('imagenet')
          self.setData({
            loading_hide: true,
            image_net: true,
            imagenet_name: result
          });


        }else{
          console.log('not_imagenet')
          self.setData({
            loading_hide: true,
            image_net: false,
            top1_pname: result[0].pname,
            top1_image: domain_name + result[0].image,
            top1_disease: result[0].disease
          });
          tmp_score = result[0].score

          // 判断top1到底有多高
          if (parseInt(tmp_score.substring(2, 4)) >= 95 || tmp_score == "1.0") {
            if (tmp_score.indexOf("e") != -1 || tmp_score.substring(2, 4) == '00') {
              self.setData({
                top1_score: "极低",
              })
            } else {
              self.setData({
                top1_score: tmp_score.substring(2, 4) + "%",
              })
            }
            if (tmp_score == "1.0") {
              self.setData({
                top1_score: "100%",
              })
            }
            self.setData({
              top1_high: true
            })
          } else {
            // top1没超过95%我们就增加另外两个top
            if (tmp_score.indexOf("e") != -1 || tmp_score.substring(2, 4) == '00') {
              self.setData({
                top1_score: "极低",
              })
            } else {
              self.setData({
                top1_score: tmp_score.substring(2, 4) + "%",
              })
            }
            self.setData({
              top1_high: false
            })

            // 为top2赋值
            self.setData({
              top2_pname: result[1].pname,
              top2_score: result[1].score.substring(2, 4) + "%",
              top2_image: domain_name + result[1].image,
              top2_disease: result[1].disease
            });
            tmp_score = result[1].score
            if (tmp_score.indexOf("e") != -1 || tmp_score.substring(2, 4) == '00') {
              self.setData({
                top2_score: "极低",
              })
            } else {
              self.setData({
                top2_score: tmp_score.substring(2, 4) + "%",
              })
            }

            // 为top3赋值
            self.setData({
              top3_pname: result[2].pname,
              top3_score: result[2].score.substring(2, 4) + "%",
              top3_image: domain_name + result[2].image,
              top3_disease: result[2].disease
            });
            tmp_score = result[2].score
            if (tmp_score.indexOf("e") != -1 || tmp_score.substring(2, 4) == '00') {
              self.setData({
                top3_score: "极低",
              })
            } else {
              self.setData({
                top3_score: tmp_score.substring(2, 4) + "%",
              })
            }
          }

          self.setData({
            top1_rate: 50 * (1 - parseFloat(result[0].score)) + 'px',
            top2_rate: 50 * (1 - parseFloat(result[1].score)) + 'px',
            top3_rate: 50 * (1 - parseFloat(result[2].score)) + 'px',
          })

        }

        
      },

    });
  },
  more_detail:function(e){
    console.log(e.target.dataset)
    var tem_text = e.target.dataset.text
    if (tem_text.indexOf("健康") != -1 ){
      tem_text = tem_text.replace('健康','')
    }
    wx.navigateTo({
      url: '/pages/search_result/seach_result?search_text=' + tem_text,
      
    })
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    wx.showToast({
      title: '已提交',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
    this.setData({
      hiddenmodalput: true
    })
  },

  douwo:function(){
    wx.showToast({
      title: '逗了我还想看？？',
      icon:'warn',
      duration: 1000,
      mask: true
    })
  }
})
