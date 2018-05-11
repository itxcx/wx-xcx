废话不多说 这里直接是对应的js文件

大概的描述一下我们的html结构

小程序录制视频 是有好几种种方法的 一种是唤起我们手机的摄像头来进行录像 另一种是通过创建canvas对象 还有另一种是创建video对象

今天我们主要讲 唤起手机摄像头来进行录制视频 这个模块是我在做小程序的人脸识别和视频活体认证的过程中设计的 所以还是可以分享一下的

人脸识别 视频活体认证我是走的face++的这一个流程

其实很简单 我们前端来说

1、请求随机数接口【face++返回随机数】--------》2、读四位随机数录制3-6秒的视频上传到后台------》3、后台拿着视频验证
验证的时候又是分为有源验证 无源验证【关于人脸识别后面我会整理一个文档记录 敬请期待】
好了 我们开始吧



/**
 * 代码风格我是按照小程序的风格走的 方便大家对比
 * 这种方法不需要页面放canvas 你可以把方法中的路径直接放到video来播放
 */
faceRecordVideo: function () {
  const that = this

  // 关于这个接口可以查看一下小程序的文档
  wx.chooseVideo({
    sourceType: ['camera'],
    maxDuration: 6,
    camera: 'back',
    success: (res) => {
      console.log(res, '视频信息')
      if (res.duration < 3 && res.duration > 6 || res.size > 20971520) {
        console.log('视频时长为3-6秒, 大小不得大于20MB')
      } else {
        that.setData({
          faceVideoPath: res.tempFilePath
        })
        that.faceUpVideoUpload()
      }
    }
  })
},
/**
 * 还有一种方法就是根据页面结构的canvas
 * 要特别注意的是 我很不推荐这种方式 因为太坑了！！！！！！
 * 这种方式返回的文件格式特别大 基本上1秒1024k左右
 */
faceCheckStart: function () {
  const that = this
  // 自动创建视频对象五秒 并且上传
  // const ctx = wx.createCameraContext(this)
  ctx.startRecord()
  // 倒计时5秒
  this.setTime(5, () => {
    ctx.stopRecord({
      success: function(res) {
        console.log(res, '倒计时完成录制')
        that.setData({
          faceVideoShow: false,
          faceVideoPath: res.tempVideoPath
        })
        // 可以根据返回的路径做一些处理
      }
    })
  })
};
/**
 * 顺带一个倒计时的函数 上面有调用的
 */
setTime: function(num, callback) {
  clearInterval(timer)
  let count = num
  let timer = setInterval(() => {
    if (count > 0) {
      count--
    } else {
      clearInterval(timer)
      callback()
    }
  }, 1000)
}