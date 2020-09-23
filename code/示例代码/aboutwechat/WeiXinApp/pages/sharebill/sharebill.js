// pages/sharebill/sharebill.js
const url ="https://www.hui95810.com/api/user/"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userbillurl: "",
    HistoryShareBilllist:[],
    AtPresentShareBilllist: []
  },

  /**
   * addbill按钮绑定的页面跳转时间
   */
  addbilla: function () {
    wx.navigateTo({
      url: '../sharebill/addbill/addbill',
    })
  },


  NumToStatus: (data)=>{
    switch(data){
      case 0:
        return "等待拼单" ;
      case 1:
        return "等待确认";
      case 2:
        return "等待配送";
      case 3:
        return "订单完成";
      default:
        return "状态错误";
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openid
    wx.request({
      url: url + app.globalData.openid,
      method:"GET",
      success: function (res) {
        let atPresent=[];
        let history=[];
        if(res.statusCode==200){
          if (res.data.userBills.length) {
            // todo 需要判断的status应该考虑针对于每个user而言的bill的状态
            res.data.userBills.forEach((element) => {
              if (element.status == "3") {
                history.push({
                  shopName: element.shopList.shop.name,
                  platName: element.shopList.platform,
                  state: that.NumToStatus(element.status),
                  url: element.shopList.url,
                  userbillurl: element.url,
                  userstatus: element.status
                })
              }
              else {
                atPresent.push({
                  shopName: element.shopList.shop.name,
                  platName: element.shopList.platform,
                  state: that.NumToStatus(element.status),
                  url: element.shopList.url,
                  userbillurl: element.url,
                  userstatus: element.status
                })
              }
            });
            that.setData({
              // userbillurl: url + openid,
              HistoryShareBilllist: history,
              AtPresentShareBilllist: atPresent,
            })
          }
          else {
            // TODO: 设置弹出框，提示用户没有参与过订单，同时setData为空
            wx.showModal({
              title: "欢迎新用户",
              content: "您还没有参与任何订单，快点击新建订单体验一下吧~",
              showCancel: false,
            })
            that.setData({
              // userbillurl: url + app.globalData.openid,
              HistoryShareBilllist: history,
              AtPresentShareBilllist: atPresent,
            })
          }
        }
        else{
          wx.showModal({
            title: "欢迎新用户",
            content: "您还没有参与任何订单，快点击新建订单体验一下吧~",
            showCancel: false,
          })
          that.setData({
            // userbillurl: url + app.globalData.openid,
            HistoryShareBilllist: history,
            AtPresentShareBilllist: atPresent,
          })
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
      this.onLoad();
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
