//index.js
//获取应用实例
const app = getApp()
const url ="https://www.hui95810.com/api/shop/"
const urlLocation = "https://www.hui95810.com/api/user/GetMessage/"


Page({
  data: {
    inputShowed: false,
    inputVal: "",
    shoplist:[] ,
    location: app.globalData.userLocation
  },
  //search box
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

// 获取后台传来的数据用于
  onLoad: function () {
    var that=this;
    wx.request({
      url: url,
      method:"GET",
      header:{
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          shoplist: res.data
        })
      }
    })
  },

  onReady: function () {
    var that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则将无法为您定位',
            success: function (res) {
              if (res.cancel) {
                console.info("授权失败返回数据");

              } else if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                      //再次授权，调用getLocationt的API
                      wx.getLocation({
                        success: ({ latitude, longitude }) => {
                          wx.request({
                            url: urlLocation,
                            method: "POST",
                            data:{
                              method: "GET",
                              url: "http://apis.map.qq.com/ws/geocoder/v1/",
                              param: {
                                location: latitude+","+longitude,
                                key: "OCMBZ-OZ465-BVZIW-QJOM4-J32UH-CIFJL",
                              }
                            },
                            // header: {
                            //   'content-type': 'application/json'
                            // },
                            // url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=OCMBZ-OZ465-BVZIW-QJOM4-J32UH-CIFJL',
                            success: (res) => {
                              let info = res.data.result
                              that.setData({
                                location: info.address
                              })
                            }
                          })
                        }
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        } else{//初始化进入
          wx.getLocation({
            success: ({ latitude, longitude }) => {
              wx.request({
                url: urlLocation,
                method: "POST",
                data: {
                  method: "GET",
                  url: "http://apis.map.qq.com/ws/geocoder/v1/",
                  param: {
                    location: latitude + "," + longitude,
                    key: "OCMBZ-OZ465-BVZIW-QJOM4-J32UH-CIFJL",
                  }
                },
                // header: {
                //   'content-type': 'application/json'
                // },
                // url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=OCMBZ-OZ465-BVZIW-QJOM4-J32UH-CIFJL',
                success: (res) => {
                  let info = res.data.result
                  that.setData({
                    location: info.address
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '要和你拼',
      desc: '我发现了一个可以拼单的地方，再也不怕奶茶凑不够配送费啦~',
      path: '/pages/index/index'
    }
  }
})
