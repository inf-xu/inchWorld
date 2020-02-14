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

// today
const todayDate = () => {
    var regS = new RegExp("\\/", "g");
    return moment().format('L').replace(regS, '.')
}

// Json排序
function JsonSort(json, key) {
    for (var j = 1, jl = json.length; j < jl; j++) {
        var temp = json[j],
            val = temp[key],
            i = j - 1;
        while (i >= 0 && json[i][key] > val) {
            json[i + 1] = json[i];
            i = i - 1;
        }
        json[i + 1] = temp;

    }
    return json;
}

// 随机颜色
function RandomColor() {
    const colorList = [
        "#ff8080",
        "#FF80AC",
        "#71B8FF",
        "#80D8FF",
        "#85B8CF",
        "#90C652",
        "#D8AA5A",
        "#FC9F9D",
        "#0A9A84",
        "#61BC69",
        "#12AEF3",
        "#E29AAD"
    ];
    let num = Math.floor(Math.random() * 10);
    return colorList[num];
}

// 检查图片
function checkImgExists(imgurl) {
    var ImgObj = new Image(); //判断图片是否存在
    ImgObj.src = imgurl;
    //存在图片
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return imgurl;
    } else {
        return require('../assets/load.png');
    }
}

function longTimeTouch(e, callback) {
    clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
    this.Loop = setTimeout(
        callback,
        1000
    );
}

module.exports = {
    getDataArea: getDataArea,
    currentDate: currentDate,
    JsonSort: JsonSort,
    todayDate: todayDate,
    RandomColor: RandomColor,
    checkImgExists: checkImgExists,
    longTimeTouch: longTimeTouch
}