// pages/sharebill/billdetail/billdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    userbillurl:"",
    userstatus:0,
    userInfo:{},
    isOwner:false,
    isFinished:false,
    isEnd:false,
  },

  NumToStatus: (data) => {
    switch (data) {
      case 0:
        return "等待拼单";
      case 1:
        return "等待确认";
      case 2:
        return "等待配送";
      case 3:
        return "订单完成";
      default:
        return data;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 在页面加载时，就将页面数据setdata
  onLoad: function (params) {
    var that = this;
    that.setData({
      url:params.url,
      userbillurl: params.userbillurl,
      userstatus:params.userstatus,
    })
    console.log(that.data.userstatus)
    wx.request({
      url: `${params.url}`,
      success: function (res) {
        let billInfoRaw={};
        let isOwner = false;
        let isEnd = false;
        let isFinished =false;
        let status = "";
        if(res.data.owner.openId == app.globalData.openid){
          isOwner = true;
        }
        if (that.data.userstatus == 3){
          isEnd = true;
          status = that.NumToStatus(3)
        }
        // todo 确定此处应该更改的数组
        else if (that.data.userstatus == 2) {
          isFinished = true;
          status = that.NumToStatus(2)
        }
        else if (that.data.userstatus == 1){
          status = that.NumToStatus(1)
        }
        else if(that.data.userstatus == 0){
          status = that.NumToStatus(0)
        }
        else{
          status = "状态错误"
        }
        console.log(status)
        console.log(that.data.userstatus),
        billInfoRaw={
          extraMoney:res.data.extraMoney,
          shopName:res.data.shop.name,
          plantName:res.data.platform,
          location:res.data.location,
          target:res.data.target,
          discount:res.data.discount,
          state: status,
          userList:res.data.userBills,
          url:res.data.url,
        }

        that.setData({
          BillInfo: billInfoRaw,
          isOwner: isOwner,
          isFinished: isFinished,
          isEnd: isEnd,
        })

        console.log(that.data)
      }
    })
    // 通过传来的参数去判断isOwner，isFinished

  },




// 将userinfo和点击已拼单完成按钮的事件发送出去
  forsubmit: function(){
    var that = this;
    //  通过判断isOwner和isFinished去判断点击的按钮的文字，用户想表达的意义
    var wantTodo;
    if(that.data.isOwner){
      if(that.data.isFinished){
        wantTodo="配送完成";
        wx.request({
          method:"POST",
          url: that.data.userbillurl + "SetStatus/",
          success: (res) => {
            if (res.statusCode == 200) {
              wx.showModal({
                title: '状态已更新',
                content: '已确认收到商品，订单将转变为历史状态~',
                showCancel: false,
                success:(res)=>{
                  if(res.confirm){
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })
            }
          }
        });
      }
      else{
        wantTodo="拼单完成";
        // 拼单完成是针对于每个订单的个人而言的，因此url应该不同
        wx.request({
          method: "POST",
          url: that.data.url + "SetStatus/",
          success:(res)=>{
            if(res.statusCode==200){
              wx.showModal({
                title: '状态已更新',
                content: '快去给你的小伙伴点餐吧~',
                showCancel: false,
                success: (res) => {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })
            }
          }
        });
      }
    }
    else {
      wantTodo = "配送完成";
      wx.request({
        method: "POST",
        url: that.data.userbillurl + "SetStatus/",
        success: (res) => {
          if (res.statusCode == 200) {
            wx.showModal({
              title: '状态已更新',
              content: '已确认收到商品，订单将转变为历史状态~',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }
            })
          }
        }
      });
    }
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
