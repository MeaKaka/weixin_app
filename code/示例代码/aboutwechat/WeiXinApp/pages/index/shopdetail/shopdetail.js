// pages/index/shopdetail/shopdetail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopdetailSumary: {},
    shopdetailName: {},
    shopdetailImage: {},
    shopdetailList: [],
    sendurl:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    // params是index传过来的参数
    var that = this;
    that.setData({
      sendurl: params.url,
    })
    wx.request({
      url: `${params.url}`,
      success: function (res) {
        let result = []
        let indexDict = {}
        res.data.shopListItems.forEach((element, index) => {
          // todo 只显示状态为等待拼单的订单，注意status的位置
          if(element.status === 0){
            if (!(element.platform in indexDict)) {
              indexDict[element.platform] = result.length
              result.push({
                platform: element.platform,
                shopBillInfoList: []
              })
            }
            result[indexDict[element.platform]]["shopBillInfoList"].push({
              location: element.location,
              hasMoney: element.hasMoney,
              target: element.target,
              discount: element.discount,
              url: element.url
            })
          }
        });
        if(result.length==0){
          wx.showModal({
            title: "没有待拼单",
            content: "抱歉~没有待拼单，你可以在订单页主动创建订单哦~",
            showCancel: false,
            success:(res)=>{
              if(res.confirm==true){
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })
        }
        that.setData({
          shopdetailSumary:res.data.summary,
          shopdetailName: res.data.name,
          shopdetailImage: res.data.image,
          shopdetailList:result
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
      return{
        title:'要和你拼',
        desc:'我发现了一个可以拼单的地方，再也不怕奶茶凑不够配送费啦~',
        path:'/pages/index/index'
      }
  }
})