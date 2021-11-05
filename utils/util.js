const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function  GetDateStr(AddDayCount) { 
  var  dd =  new  Date();
  dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
  var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
  var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
  return  m+ "." +d; 
}

function  GetDateStrArr(AddDayCount) { 
  var dateArr  =[]
  for(var i=-15;i<0;i++){
    var date = GetDateStr(i)
    dateArr.push(date)
  }
  return dateArr
}


module.exports = {
  formatTime: formatTime,
  GetDateStrArr:GetDateStrArr
}

