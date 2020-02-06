//获取周一至周五,到周日的话i=> 5变为7
const getDataArea = () => {
    var currentDate = new Date()
    var timesStamp = currentDate.getTime();
    var currenDay = currentDate.getDay();
    var dates = [];
    for (var i = 0; i < 7; i++) {
        let fullDate = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-')
        let newDate = fullDate.replace(/-(\d)(?!\d)/g, '-0$1')
        newDate = newDate.split('-')[1] + '-' + newDate.split('-')[2]
        dates.push(newDate)
    }
    return dates
}


// var today = new Date('2020-02-06');

// //一周的时间
// var weeks = getDataArea(today);
// console.log('weeks', weeks);

// console.log('today', today);

const A = [0, 4]
const B = [0, 1, 2, 3, 4, 5]
const C = [0, 1, 2, 3, 4, 5]
const D = [{
        kcsj: 0,
        info: "操作系统@李勇N4-404"
    },
    {
        kcsj: 4,
        info: "操作系统@李勇N4-404"
    }
]


/* var d = B.filter(
    function(v){ 
        return A.indexOf(v) == -1 
    }
) */

B.filter(
    function(v){ 
        if (A.indexOf(v) == -1) {
            const o = {
                kcsj: v,
                info: "此节无课，放松一下吧!"
            }
            D.push(o)
        }
    }
)

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

JsonSort(D, 'kcsj')


// console.log(d.length === 0 ? true : false);


