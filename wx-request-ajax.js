/**
 * App 微信配置文件app.js
 * author: nujey
 * versions: 1.0.0
 */
App({
  /**
   * @param {Object} options 调用的时候传入的参数对象
   */
  ajax: function (options) {
    // 把app的this重新保存
    const wx_this = this
    // 请求过渡加载过程
    // showLoading是微信自带的api 就是菊花转转转的请求过程
    wx.showLoading({
      title: '加载中',
    })
    // 把调用的时候传入的url和小程序的域名拼接
    // 得到 调用接口的地址
    // this.globalData.apiHost 是获取到全局数据下面的接口域名
    options.url = this.globalData.apiHost + options.url;
    return new Promise(function(resolve, reject) {
      // 发起微信请求
      wx.request({
        method: options.method,
        url: options.url,
        data: options.data,
        success: (result) => {
          wx.hideLoading()
          // http请求时200的时候
          if (result.statusCode === 200) {
            // 这里是请求到的数据的code为成功的时候 可以根据自己的情况来定 100是自定义的 后台返回成功
            if (result.data.code === 100) {
              resolve(result)
            } else if (result.data.code === 101) {
              // 这里的101 不是幛光101 是一个后台返回101的时候 证明微信登陆已经过时 需要重新登录一下
              app.login(function () {
                that.onLoad({ id: that.data.id });
              });
            } else {
              // 其余的错误信息和code码 可以根据具体情况来定义title
              wx.showModal({
                title: result.data.code.toString(),
                content: result.data.hint,
                showCancel: false,
              })
            }
          } else {
            // http请求错误信息处理 微信自带的弹出框
            wx.showModal({
              title: '提示',
              content: '服务器错误，请联系客服',
              showCancel: false,
            }) 
          }
        },
      })
    })
  }
})

// 调用
// 在每个页面的page前面会有一个 app = getApp() 获取app实例
const app = getApp()
page({
  // 比如我们在onLoad的时候
  onLoad: function() {
    const params = {
      token: '...',
      id: '...',
    }
    app.ajax(params).then((result) => {
      // 处理数据
    })
  }
})

// 具体的情况可以自己来修改一下
// 大佬们勿嘲风 小白上路
