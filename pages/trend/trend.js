import * as echarts from '../../components/ec-canvas/echarts';
import {
  requestGet
} from "../../utils/request";
import {
  GetDateStrArr
} from '../../utils/util';
import Toast from "../../components/vant/toast/toast";
import xchina from '../../components/ec-canvas/999';
var util = require('../../utils/util.js');
const app = getApp();

function initChart(canvas, width, height, dpr) {
  var that = this;
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const colors = ['#EE6666', '#5470C6'];

  // 指定图表的配置项和数据
  var option = {
    color: colors,
    legend: {
      data: ['总新增确诊', '新增境外输入'],
      left: 130,
    },
    //网格
    grid: {
      top: "15%",
      left: "3%",
      right: "5%",
      bottom: "5%",
      //containLabel参数：指的是grid 区域是否包含坐标轴的刻度标签,默认false
      containLabel: true
    },
    //提示框在鼠标移动到指定元素上显示
    tooltip: {
      show: true,
      //触发事件
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: GetDateStrArr(),
      // 去除刻度
      axisTick: {
        show: false,
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(128,128,128)",
      },
      //线条颜色
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      }
    },
    series: [{
      name: '总新增确诊',
      type: 'line',
      smooth: true,
      data: [29, 51, 60, 56, 47, 55, 66, 52, 72, 108, 81, 99, 77, 115, 96]
    }, {
      name: '新增境外输入',
      type: 'line',
      smooth: true,
      data: [8, 15, 12, 17, 4, 14, 9, 16, 16, 19, 23, 33, 17, 16, 24]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    time: '',
    activeName: ['1'],
    ec: {
      onInit: initChart
    },
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onReady: function (options) {
    this.getListData();
    this.setData({
      time: util.formatTime(new Date())
    });

  },

  async getListData() {
    const result = await requestGet("http://api.tianapi.com/ncov/index?key=5d206a0670dfbaf479318be06a186026");
    var newst = result.newslist[0].news;
    this.setData({
      list: newst,
    })

    function days(day) {
      return xchina.data[xchina.data.length - day].confirmedIncr
    };

    function days1(day1) {
      return xchina.data[xchina.data.length - day1].suspectedCountIncr
    }

    this.echartsComponent = this.selectComponent("#mychart-dom-line");
    this.echartsComponent.chart.setOption({
      series: [{
        data: [days(15), days(14),days(13), days(12), days(11), days(10), days(9), days(8), days(7), days(6), days(5), days(4), days(3), days(2), days(1)]
      }, {
        data: [days1(15), days1(14),days1(13), days1(12), days1(11), days1(10), days1(9), days1(8), days1(7), days1(6), days1(5), days1(4), days1(3), days1(2), days1(1)]
      }]
    });
  },

});