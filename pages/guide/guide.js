
Page({
  data: {
    pageIndex:1,
    gudie:[]
  },
  
  click4: function (event) {
    wx.navigateTo({
      url: "/pages/guide/hard/hard",
    });
  },
  click5: function (event) {
    wx.navigateTo({
      url: "/pages/guide/protect/protect",
    });
  },
  click6: function (event) {
    wx.navigateTo({
      url: "/pages/guide/indoor/indoor",
    });
  },
  click7: function (event) {
    wx.navigateTo({
      url: "/pages/guide/know/know",
    });
  },
  click8: function (event) {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  click9: function (event) {
    wx.navigateTo({
      url: "/pages/guide/doctor/doctor",
    });
  },

})
