import {
  requestGet
} from "../../utils/request";
import * as echarts from '../../components/ec-canvas/echarts'
import geoJson from  '../../components/ec-canvas/china'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:10,
    active: 0,
    guowaiinfos: [],
    index: 0,
    xiangqing:[],
    chinainfos:[],
    ecMap:{
      onInit:initChartMap
    },
    texts:"查看更多>>"
  },
  onReady() {  
    this.gettime();
    this.getiptnew();
    this.getguowai();
    

    
  },

  async gettime() {
    
    const result = await requestGet("https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5");
    var obj = JSON.parse(result.data);
    var chinainfos = obj.areaTree[0].children;
    var chinainfo=chinainfos.slice(0,this.data.idx)
    var time = obj.lastUpdateTime;
    this.setData({
      lastUpdateTime: time,
      chinainfos: chinainfos,
      chinainfo:chinainfo
    });



    this.echartscompoent=this.selectComponent("#mychart-dom-map")
    this.echartscompoent.chart.setOption({
      series: [
        {
          type: 'map',
          mapType: 'china',
          geoIndex: 0,
          roam: false, // 鼠标是否可以缩放
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { name: '北京市', value:  chazhao("北京")},
            { name: '天津市', value: chazhao("天津") },
            { name: '上海市', value: chazhao("上海") },
            { name: '重庆市', value: chazhao("重庆") },
            { name: '河北省', value: chazhao("河北") },
            { name: '河南省', value: chazhao("河南") },
            { name: '云南省', value: chazhao("云南")},
            { name: '辽宁省', value: chazhao("辽宁") },
            { name: '黑龙江省', value:chazhao("黑龙江") },
            { name: '湖南省', value: chazhao("湖南") },
            { name: '安徽省', value: chazhao("安徽") },
            { name: '山东省', value: chazhao("山东") },
            { name: '新疆维吾尔自治区', value: chazhao("新疆") },
            { name: '江苏省', value: chazhao("江苏") },
            { name: '浙江省', value: chazhao("浙江") },
            { name: '江西省', value: chazhao("江西") },
            { name: '湖北省', value: chazhao("湖北")},
            { name: '广西壮族自治区', value: chazhao("广西")},
            { name: '甘肃省', value: chazhao("甘肃")},
            { name: '山西省', value: chazhao("山西") },
            { name: '内蒙古自治区', value:chazhao("内蒙古") },
            { name: '陕西省', value: chazhao("陕西") },
            { name: '吉林省', value:chazhao("吉林")},
            { name: '福建省', value: chazhao("福建") },
            { name: '贵州省', value:chazhao("贵州") },
            { name: '广东省', value: chazhao("广东") },
            { name: '青海省', value: chazhao("青海") },
            { name: '西藏自治区', value: chazhao("西藏") },
            { name: '四川省', value: chazhao("四川")},
            { name: '宁夏回族自治区', value:chazhao("宁夏")},
            { name: '海南省', value: chazhao("海南") },
            { name: '台湾省', value: chazhao("台湾")},
            { name: '香港特别行政区', value: chazhao("香港") },
            { name: '澳门特别行政区', value: chazhao("澳门") }
          ]
        }]
    });
    function chazhao(province){
      var _this=getCurrentPages()
      var xinxi=_this[0].data.chinainfos;
      for(var i=0;i<xinxi.length;i++){
        if(province==xinxi[i].name){
          return xinxi[i].total.nowConfirm;
        }
      }
    }
    
//option结束

  },




  async getiptnew() {
    const result = await requestGet("http://api.tianapi.com/ncov/index?key=5d206a0670dfbaf479318be06a186026");
    var nowquezhen = result.newslist[0].desc.currentConfirmedCount
    var newquezhen = result.newslist[0].desc.currentConfirmedIncr
    var newsiwang = result.newslist[0].desc.deadIncr
    var nowsiwang = result.newslist[0].desc.deadCount
    var newzhiyu = result.newslist[0].desc.curedIncr
    var nowzhiyu = result.newslist[0].desc.curedCount
    this.setData({
      newqz: newquezhen,
      nowqz: nowquezhen,
      newsw: newsiwang,
      nowsw: nowsiwang,
      newzy: newzhiyu,
      nowzy: nowzhiyu
    });
  },
  async getguowai() {
    const result = await requestGet("http://api.tianapi.com/ncovabroad/index?key=5d206a0670dfbaf479318be06a186026");
    var guowaiinfos = result.newslist.slice(this.data.index, this.data.index + 15);
    this.setData({
      guowaiinfos: guowaiinfos
    });
  },
  async xiayiye() {
    if (this.data.index < 210) {
      var count = this.data.index + 15;
      this.setData({
        index: count
      });
      this.getguowai();
    }

  },

  async shangyiye() {
    if (this.data.index > 0) {
      var count = this.data.index - 15;
      this.setData({
        index: count,
      });
      this.getguowai();

    }
    
  },

  async findmores() {
    var idx1=this.data.chinainfos.length;
    var kong=""
    this.setData({
      texts:kong,
      idx:idx1
    })
    this.gettime()
    
  },
   async xiangqing(e){
    const result = await requestGet("https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5");
    var obj = JSON.parse(result.data);
    var chinainfos = obj.areaTree[0].children;
    var shen=e.currentTarget.dataset.item;
    for(var i=0;i<chinainfos.length;i++){
      if(shen==chinainfos[i].name){
        app.globalData.xiangqing=chinainfos[i].children;
        wx:wx.navigateTo({
          url: '/pages/tongji/xiangqing/xiangqing',
  
        });
      }
      
    }

  },

  async findmore(){

  }

})



 
/**
 * 全国疫情分布地图
 */








function initChartMap(canvas, width, height) {
  
  let myMap = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(myMap);
  echarts.registerMap('china', geoJson);  // 绘制中国地图
 
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: "#fff",
      padding: [
        10,  // 上
        15, // 右
        8,  // 下
        15, // 左
      ],
      extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
      textStyle: {
        fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
        color: '#005dff',
        fontSize: 12,
      },
      formatter: `{b} :  现存{c}确诊`
    },
    geo: [
      {
        // 地理坐标系组件
        map: "china",
        roam: true, // 可以缩放和平移
        aspectScale: 0.8, // 比例
        layoutCenter: ["50%", "38%"], // position位置
        layoutSize: 370, // 地图大小，保证了不超过 370x370 的区域
        label: {
          // 图形上的文本标签
          normal: {
            show: true,
            textStyle: {
              color: "rgba(0, 0, 0, 0.9)",
              fontSize: '8'
            }
          },
          emphasis: { // 高亮时样式
            color: "#333"
          }
        },
        itemStyle: {
          // 图形上的地图区域
          normal: {
            borderColor: "rgba(0,0,0,0.2)",
            areaColor: "#005dff"
          },
          emphasis: { // 高亮时样式
            color: "lightblue"
          }
        }
      }
    ],
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',

    },
    visualMap: {
      min: 0,
      max: 200,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#fcebcf', 'yellow', 'orangered']
      }
    },
    series: [
      {
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        roam: false, // 鼠标是否可以缩放
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [
          { name: '北京市', value:0 },
          { name: '天津市', value: 0 },
          { name: '上海市', value: 0 },
          { name: '重庆市', value: 0 },
          { name: '河北省', value: 0 },
          { name: '河南省', value: 0 },
          { name: '云南省', value: 0 },
          { name: '辽宁省', value: 0 },
          { name: '黑龙江省', value: 0 },
          { name: '湖南省', value: 0 },
          { name: '安徽省', value: 0 },
          { name: '山东省', value:0 },
          { name: '新疆维吾尔自治区', value: 0 },
          { name: '江苏省', value: 0 },
          { name: '浙江省', value: 0 },
          { name: '江西省', value: 0 },
          { name: '湖北省', value: 0 },
          { name: '广西壮族自治区', value: 0 },
          { name: '甘肃省', value: 0 },
          { name: '山西省', value: 0 },
          { name: '内蒙古自治区', value:0 },
          { name: '陕西省', value: 0 },
          { name: '吉林省', value: 0 },
          { name: '福建省', value: 0 },
          { name: '贵州省', value: 0 },
          { name: '广东省', value: 0 },
          { name: '青海省', value: 0 },
          { name: '西藏自治区', value: 0 },
          { name: '四川省', value: 0 },
          { name: '宁夏回族自治区', value: 0 },
          { name: '海南省', value: 0 },
          { name: '台湾省', value:0},
          { name: '香港特别行政区', value: 0 },
          { name: '澳门特别行政区', value:0 }
        ]
      }]
  };
 
  myMap.setOption(option);
  return myMap
}
