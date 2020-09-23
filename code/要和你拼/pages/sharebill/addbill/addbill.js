var app = getApp()
const url = "https://www.hui95810.com/api/shopListItem/"
const shopurl = "https://www.hui95810.com/api/shop/GetShops/"
Page({



  /**
   * 页面的初始数据
   */
  data: {
      plat:['淘宝外卖',"饿了么","百度外卖","美团外卖"],
      index: 0,
      multiArray: [['花甲粉（北邮店）', '商店2', '商店3', '商店4'], ['淘宝外卖', "饿了么", "百度外卖", "美团外卖"]],
      multiIndex: [0, 0],
  },

  bindViewEvent: function(e){
    app.process(this,e)
  },


  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  formSubmit: function (e) {
    var that = this;
    console.log(this.data.multiIndex)
    console.log('data:', e.detail.value);
    console.log('picker:', that.data.multiArray[0][that.data.multiIndex[0]])
    // 将数据发送给后台
    e.detail.value.shop = that.data.multiArray[0][that.data.multiIndex[0]]
    e.detail.value.platform = that.data.multiArray[1][that.data.multiIndex[1]]   
    e.detail.value.openId = app.globalData.openid
    wx.request({
      url: url,
      data: e.detail.value,
      method: "POST",
      success: function (res) {
        if(res.statusCode==201){
          wx.showToast(
            {
              title: res.data.message,
              icon: "success",
              duration: 3000,
              success: setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
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
        else{
          console.log(res.data.message)
          wx.showModal({
            title: "新建订单失败",
            content: res.data.message,
            showCancel: false,
          })
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const shoplist=[];
      wx.request({
        url: shopurl,
        method: "GET",
        success:(res)=>{
          shoplist.push(res.data.shops)
          shoplist.push(['淘宝外卖', "饿了么", "百度外卖", "美团外卖"])
          console.log(shoplist)
          that.setData({
            multiArray:shoplist
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
    console.log("addbill页面的当前pages_show")
    var pages = getCurrentPages()
    console.log(pages)
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