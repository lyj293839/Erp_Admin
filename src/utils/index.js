/**
 * 将list中的数据状态字段的值和msg中的键对比，
 * @param msg
 * @param list
 */
import util from "@/libs/util";
export function tsfrmTxtsByStu (msg, list) {
  let arr = []
  for (let key in list) {
    arr.push(list[key])
  }

  arr.map(item => {
    for (let key in msg) {
      if (item.status) {
        // eslint-disable-next-line eqeqeq
        if (item.status == key) {
          item.status = msg[key].zh
          break
        }
      }
    }
  })

  return arr
}

/**
 * 将返回数据中的status的值和msg中的键对比，常用于更改状态之后的按钮文字的替换
 * @param status
 * @param msg
 */
export function tsfrmStusByMsg (status, msg) {
  for (let key in msg.status) {
    if (key === status) {
      status = msg.status[key].zh
      break
    };
  }
  return status
}

/**
 *
 * @param type  MSG里的type
 * @param options  select data
 */

export function tsfrmSelByType (type, options) {
  options.map(item => {
    for (let key in type) {
      if (item.value === key) {
        item.label = type[key].zh
        break
      }
    }
  })
}

export function getImgPath (imgPath) {
  return imgPath + '?' + (new Date()).getTime()
}
/**
 *
 * @param time
 * @param cFormat
 * @returns {*} 时间字符串
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // eslint-disable-next-line camelcase
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  // eslint-disable-next-line camelcase
  return time_str
}

// 制保留2位小数，如：2，会在2后面补上00.即2.00
export function toDecimal2 (x) {
  let f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(x * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

/**
 * reset listQuery 除了page,目的是为了添加操作时重新加载表格
 * @param listQuery
 */

export function resetListQuery (listQuery) {
  for (let key in listQuery) {
    if (key !== 'page_current') {
      listQuery[key] = ''
    }
    ;
  }
}
// 专为order页面写的，type不重置
export function resetOrdListQuery (listQuery) {
  for (let key in listQuery) {
    if (key !== 'page_current' && key !== 'type' && key !== 'status') {
      listQuery[key] = ''
    };
  }
}

export function is (obj, type) {
  let className = Object.prototype.toString.call(obj).slice(8, -1)
  return obj !== undefined && obj !== null && className === type
}
export function log (data) {
  // console.log(data)
}

/**
 * 获取对象属性
 * @param o
 * @param s
 * @returns {string|*}
 */
export function attr (that, s) {
  let a = s.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.')
  var regex = /(\.?\w+)|\[(\w+)\]/g
  let array = [...s.matchAll(regex)].map(function (item) {
    return item[0]
  })
  let keyStr = ''
  for (let i = 0; i < a.length; ++i) {
    var k = a[i]
    keyStr += array[i]
    if (is(that, 'Object') || is(that, 'Array')) {
      if (k in that) {
        that = that[k]
      } else {
        log(keyStr + '\tundefined')
        if (process.env.NODE_ENV === 'development') {
          return
        }
        return ''
      }
    } else {
      log(keyStr + '\tundefined')
      if (process.env.NODE_ENV === 'development') {
        return
      }
      return ''
    }
  }
  return that
}

export function getEnumValue (enums, id, keyName) {
  // eslint-disable-next-line valid-typeof
  if(!keyName){
    keyName='name'
  }
  if (is(enums, 'Object')) {
    return enums.hasOwnProperty(id) && enums[id].hasOwnProperty(keyName) ? enums[id][keyName] : ''
  }
  if (!is(id, 'Number')) {
    return ''
  }
  if (is(enums, 'Array')) {
    for (var i = 0; i < enums.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (enums[i].hasOwnProperty('id') && enums[i].hasOwnProperty(keyName) && enums[i].id === id) {
        return enums[i][keyName]
      }
      // return (enums[i].hasOwnProperty('id') && enums[i].hasOwnProperty('name') && enums[i].id == id) ? enums[i].name : '';
    }
  }
  return ''
}
//上递增
export function upGo(fieldData,index){

  if(index!=0){

      fieldData[index] = fieldData.splice(index-1, 1, fieldData[index])[0];

  }else{

      fieldData.push(fieldData.shift());

  }
}
//下递减
export function downGo(fieldData,index) {

  if(index!=fieldData.length-1){

      fieldData[index] = fieldData.splice(index+1, 1, fieldData[index])[0];

  }else{

      fieldData.unshift( fieldData.splice(index,1)[0]);

  }
}
//接口
export function workflow (id,enabledTrans, i18n,aaa,routes) {
  for(var i in enabledTrans){
      var b = []
      if(enabledTrans[i].length>0){
        enabledTrans[i].forEach(j=>{
            var c = {
                name:i18n?i18n.zh_cn.places[j]:j,
                val:j
            }
            b.push(c)
        })
      }
      var a = i.substring(0, i.indexOf("."))
      var arr = {
          id:id,
          need_seal:'',
          name:i18n?i18n.zh_cn.transitions[i]:i,
          obj:'',
          obj_name:i.substring(a.length+1, i.length),
          list:b,
          url:routes?routes[i][i]:'',
          permission:i
      }
      aaa.push(arr)
  }
  return aaa
}

export function forceFileDownload (response, filename) {
  const url = window.URL.createObjectURL(new Blob([response]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename) // or any other extension
  document.body.appendChild(link)
  link.click()
  // eslint-disable-next-line no-unused-vars
  let timeout = setTimeout(function () {
    document.body.removeChild(link)
    // eslint-disable-next-line no-unused-expressions
    window.URL.revokeObjectURL(url)
    // eslint-disable-next-line no-sequences
    , 1000
  })
}

/**
 * console.log(futureDate(new Date(),-30))
 * @param data
 * @param days
 * @author scala
 * @returns {string}
 */
export function futureDate (data, days, options) {
  if (!options) {
    options = { timeZone: 'Asia/Shanghai', hour12: false }
  }
  var that = new Date(data)
  return new Date(that.setDate(that.getDate() + days)).toLocaleDateString('zh-CN', options).split("/").map(function(item){
    if(item<10){
      item = "0"+item
    }
    return item;
  }).join("-")
}

/**
 * @author scala
 * @returns {string}
 */
export function getDate (dateStr="") {
  let options = { timeZone: 'Asia/Shanghai', hour12: false }
  let date = dateStr?new Date(dateStr):new Date()
  let dateString = date.toLocaleDateString('zh-CN', options).split("/").map(function(item){
    if(item<10){
      item = "0"+item
    }
    return item;
  }).join("-")
  let timeString = date.toLocaleTimeString('zh-CN', options)
  return dateString+" "+timeString
}
export function getDay (dateStr="") {
    let options = { timeZone: 'Asia/Shanghai', hour12: false }
    let date = dateStr?new Date(dateStr):new Date()
    let dateString = date.toLocaleDateString('zh-CN', options).split("/").map(function(item){
        if(item<10){
            item = "0"+item
        }
        return item;
    }).join("-")
    return dateString
}

export function beforeSearch (that) {
  that.queryList.page = 1
  that.loading_search = true
}
export function showCustomer_sale (userID,salerID,sale_id) {
  let ids=['6','7','28']
  var user_id = util.cookies.get('user_id')
    if(ids.includes(userID)){
      if(sale_id==user_id){
        return true
      }else{
        if(userID==6&&salerID==6){
            return true
        }else if((userID==7||userID==28)&&(salerID==7||salerID==28)){
            return true
        }else{
          return false
        }
      } 
    }else{
      return true
    }
}
export function showCustomer (userID,salerID,countryName='',sale_id) {
  let ids=['6','7','28']
  var user_id = util.cookies.get('user_id')
    if(ids.includes(userID)){
      if(sale_id==user_id){
        return true
      }else{
        if(userID==6&&salerID==6){
          return true
        }else if((userID==7||userID==28)&&(salerID==7||salerID==28)){
          return true
        }else if((userID==28&&countryName=='Korea')){
          return false
        }else{
          return false
        }
      } 
    }else{
      return true
    }
}
