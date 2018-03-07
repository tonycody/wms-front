const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = (date, fmt) => {
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取指定URL的参数值
 */
const getUrlParam = (url, key) => {
  var pattern = new RegExp("[?&]" + key + "\=([^&]+)", "g");
  var matcher = pattern.exec(url);
  var items = null;
  if (null != matcher) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]));
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1]);
      } catch (e) {
        items = matcher[1];
      }
    }
  }
  return items;
}

/**
 * 顶部错误提示
 */
const popError = (obj, msg) => {
  obj.setData({ errorMsg: msg });
  var timeout = setTimeout(() => {
    obj.setData({ errorMsg: '' });
    clearTimeout(timeout);
  }, 3000);
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getUrlParam: getUrlParam,
  popError: popError
}
