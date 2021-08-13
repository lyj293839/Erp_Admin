function futureDate (data, days, options) {
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
function getDate (dateStr="") {
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

console.log(futureDate(getDate(), 5));
