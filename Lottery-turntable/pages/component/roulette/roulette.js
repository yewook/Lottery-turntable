const app = getApp();
var dot_inter;
Component({
  properties: {
    options: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    },
    angel:{
      type:Number,
      value:0,
      observer: function (newVal, oldVal) { 
        if (newVal){
          this.start()
        }
      }
    }
  },
  data: {
    show: false
  },
  attached: function () {
  },
  detached: function () { 
    clearInterval(dot_inter)
  },
  ready: function () { 
    var that=this;
    that.drawCanvas();
    that.dotStart();
  },
  methods: {
    drawCanvas: function (){
      const ctx = wx.createCanvasContext('roulette', this);
      let options=this.data.options;
      var angelTo = this.data.angelTo || 0;
      var width=295;
      var height=295;
      var x = width / 2;
      var y = width / 2;
      var num=6;
      ctx.translate(x, y)
      ctx.clearRect(-width, -height, width, height);

      var angel = (2 * Math.PI / 360) * (360 / num);
      var startAngel = 2 * Math.PI / 360 * (-90);
      var endAngel = 2 * Math.PI / 360 * (-90) + angel;

      ctx.rotate(angelTo * Math.PI / 180);
      // 画外圆
      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.strokeStyle = options.bgOut;
      ctx.arc(0, 0, 130, 0, 2 * Math.PI)
      ctx.stroke();
      // 画里圆
      ctx.beginPath();
      ctx.lineWidth = 6;
      ctx.strokeStyle = options.bgMiddle;
      ctx.arc(0, 0, 120, 0, 2 * Math.PI)
      ctx.stroke();

      // 装饰点
      var dotColor = options.dotColor;
      for (var i = 0; i < 26; i++) {
        ctx.beginPath();
        var radius = 131;
        var xr = radius * Math.cos(startAngel)
        var yr = radius * Math.sin(startAngel)
        ctx.fillStyle = dotColor[i % dotColor.length]
        ctx.arc(xr, yr, 5, 0, 2 * Math.PI)
        ctx.fill()
        startAngel += (2 * Math.PI / 360) * (360 / 26);
      }
       // 画里转盘   
      var colors = options.bgInner;
      for (var i = 0; i < num; i++) {
        ctx.beginPath();
        ctx.lineWidth =116;
        ctx.strokeStyle = colors[i % colors.length]
        ctx.arc(0, 0, 60, startAngel, endAngel)
        ctx.stroke();
        startAngel = endAngel
        endAngel += angel
      }

      var awardTitle = options.award;
      startAngel = angel / 2
      for (var i = 0; i < num; i++) {
        ctx.save();
        ctx.rotate(startAngel);
        ctx.font = options.font;
        ctx.fillStyle = options.fontColor,
        ctx.textAlign = "center";
        ctx.fillText(awardTitle[i].level, 0, -90);
        startAngel += angel
        ctx.restore();
      }
      ctx.draw()
    },
    rollStart(e){
      this.triggerEvent('getAngel')
    },
    start(){
      var that=this;
      let options=that.data.options;
      var angel = that.data.angel;
      angel = 360 - angel;
      angel += 360*6;
      var baseStep = 30
      // 起始滚动速度
      var baseSpeed = 0.3
      var count = 1;

      var timer = setInterval(function () {
        that.setData({
          angelTo:count
        })
        clearInterval(dot_inter);
        that.drawCanvas();
        if (count == angel) {
          clearInterval(timer)
          that.triggerEvent('getPrize')
          that.dotStart();
        }
        count = count + baseStep * (((angel - count) / angel) > baseSpeed ? baseSpeed : ((angel - count) / angel))
        if (angel - count < 0.5) {
          count = angel
        }
      }, options.speed)
    },
    dotStart: function () {
      var that = this;
      let times = 0;
      let options =that.data.options;
      dot_inter = setInterval(function () {
        if (times % 2) {
          options.dotColor = options.dotColor_1
        } else {
          options.dotColor = options.dotColor_2
        }
        times++;
        that.setData({
          options: options
        })
        that.drawCanvas();
      }, options.speedDot)
    }
  }
})