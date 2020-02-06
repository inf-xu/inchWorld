const moment = require('moment')

//获取周一至周五,到周日的话i=> 5变为7
const getDataArea = () => {
    let currentDate = new Date()
    let timesStamp = currentDate.getTime()
    let currenDay = currentDate.getDay()
    let dates = [];
    for (let i = 0; i < 7; i++) {
       let fullDate = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-')
       let newDate = fullDate.replace(/-(\d)(?!\d)/g, '-0$1')
       newDate = newDate.split('-')[1] + '-' + newDate.split('-')[2]
       dates.push(newDate)
    }
    return dates
}

// 今日输出 02-06
const currentDate = () => {
    let today = moment().format('L')
    return today.split('/')[0] + '-' + today.split('/')[1]
}

// Json排序
function JsonSort(json,key){
    for(var j=1,jl=json.length;j < jl;j++){
        var temp = json[j],
            val = temp[key],
            i = j-1;
        while(i >=0 && json[i][key]>val){
            json[i+1] = json[i];
            i = i-1;    
        }
        json[i+1] = temp;

    }
    return json;
}

module.exports = {
    getDataArea: getDataArea,
    currentDate: currentDate,
    JsonSort: JsonSort
}