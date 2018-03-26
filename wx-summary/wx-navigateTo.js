// 小程序的路由和vue的好像不怎么一样咯，不过还是换汤不换药，我们先看一下场景
// 小程序的页面路由都是由框架进行管理的 而路由的触发方式和页面上的生命周期函数是息息相关的

// 1. 页面初始化  
   // 小程序进入第一个页面的时候 对应生命周期 onload onshow
// 2. 打开一个新页面的时候
   // wx.navigateTo 相当于指令一样的东西 或者是使用组件 <navigator /> 对应的生命周期 onload  onshow
// 3. 页面重定向
   // wx.redirectTo 或者使用组件 <navigator /> 相关生命周期 本页面 onUnload 新页面 onload onshow
// 4. 页面返回的时候
  //  调用API wx.navigateBack 或者是用户按左上角返回  相关生命周期 onShow

// 跳转页面的时候 什么时候会经历生命周期onShow

//  1. wx.navigateTo() 或者<navigator />
//  2. wx.redirectTo() 或者<navigator />
//  3. wx.navigateBack() 或者<navigator />
//  4. 切换底部Tab
