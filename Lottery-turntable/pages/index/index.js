const app = getApp()
Page({
  data: {
    rouletteData: {
      speed: 10,/**转盘速度 */
      award: [
        {
          level: '特等奖',
          prize: '奖品1'
        },
        {
          level: '一等奖',
          prize: '奖品2'
        },
        {
          level: '二等奖',
          prize: '奖品4'
        },
        {
          level: '三等奖',
          prize: '奖品3'
        },
        {
          level: '四等奖',
          prize: '奖品5'
        },
        {
          level: '五等奖',
          prize: '奖品6'
        },
      ],/**奖项内容 */
      fontColor: '#e21b58',/**文字颜色 */
      font: '18px Arial',
      bgOut: '#ffe774',/**外层 */
      bgMiddle: '#ffc046',/**中间层 */
      bgInner: ['#fff2ca', '#fdd890', '#fff2ca', '#fdd890', '#fff2ca', '#fdd890'],
      speedDot: 1000,/**点切换速度 */
      dotColor: ['#ffffff', '#b1ffdd'],
      dotColor_1: ['#ffffff', '#b1ffdd'],
      dotColor_2: ['#b1ffdd', '#ffffff'],
      angel: 0 /**选择角度 */
    },
    lotteryNum: 2
  },
  onLoad: function () { 
  },
  getAngel(e) {
    var that = this;
    let lotteryNum = that.data.lotteryNum;
    if (lotteryNum > 0) {
      this.setData({
        angel: Math.floor(Math.random(1) * 360) /**传入的角度 */
      })
    } else {
      wx.showToast({
        title: '暂无抽奖机会啦~',
        icon: 'none'
      })
    }
  },
  getPrize(e) {
    var that = this;
    let angel = that.data.angel;
    let options = that.data.rouletteData;
    let index = parseInt(that.data.angel / 60);
    let lotteryNum = that.data.lotteryNum;
    lotteryNum--;
    wx.showModal({
      title: '恭喜你',
      content: options.award[index].level,
      success:function(res){
        that.setData({
          index: index,
          lotteryNum: lotteryNum
        })
      }
    })
  },
})
