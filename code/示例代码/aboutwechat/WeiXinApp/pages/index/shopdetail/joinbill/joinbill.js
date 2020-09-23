// pages/index/shopdetail/joinbill/joinbill.js
const app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      url:{},
      baseinfo:{},//用于存放拼单发起人的相关信息，包括有多少人加入
  },


  formSubmit: function (e) {
    var that = this;
    wx.showModal({
      title: "提示",
      content: "参与拼单就不能退出喽，不能让拼单人饿肚子~你确定加入拼单了吗？",
      success: function(res){
        if(res.confirm){
          let pushdata = {
            openId: app.globalData.openid,
            tel: e.detail.value.tel,
            want: e.detail.value.want,
            pay: e.detail.value.purchase
          };
          wx.request({
            url: that.data.url,
            data: pushdata,
            method: "PUT",
            success: function (res) {
              // todo  200OK;否则有弹框信息  responseMsg；success
              if (res.statusCode == 200) {
                wx.showToast(
                  {
                    title: "已成功",
                    icon: "success",
                    duration: 3000,
                    success: setTimeout(function () {
                      wx.navigateBack({
                        delta: 2,
                        success: function (res) {
                          console.log("success");
                        },
                        fail: function () {
                          console.log("fail")
                        },
                        complete: function () {
                          console.log("有进入")
                        }
                      })
                    }, 3000)
                  });
              }
              else {
                wx.showModal({
                  title: "网络错误",
                  content: "网络错误加入订单失败！请重新提交",
                  showCancel: false,
                })
              }
            }
          })
        }
        else if(res.cancel){
          // 返回上一页面
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    // params是shopdetail传过来的参数
    var that = this;
    wx.request({
      url: `${params.url}`,
      success: function (res) {
        that.setData({
          baseinfo:res.data,
          url: `${params.url}`
        })
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
    return {
      title: '约你一起拼了',
      desc: '我发现了一个可以拼单的地方，再也不怕奶茶凑不够配送费啦~',
      path: '/pages/index/index'
    }
  
  }
})