//app.js
const urlOpenid = "https://www.hui95810.com/api/user/GetMessage/"
App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code=res.code;
        wx.request({
          url: urlOpenid,
          method: "POST",
          data:{
            method:"GET",
            url: "https://api.weixin.qq.com/sns/jscode2session",
            param:{
            appId: 'wx2be91e4b8a31861d',
            secret: 'cbbfb8aadc910fbe31ad47d935f95a93',
            js_code:code,
            grant_type: "authorization_code"
          }
          },
          success:(res) => {
            var openid = res.data.openid //返回openid
            this.globalData.openid = openid
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail:res =>{
              console.log("fail")
              console.log(res)
            }
          })
        }
        else{
          console.log("个人信息没有授权")
        }
      }
    })
  },
  globalData: {
    openid: null,
    userInfo: null,
    userLocation:"无法获取位置信息"
  }
})