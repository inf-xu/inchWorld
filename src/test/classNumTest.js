function getClassNum() {
    const now = new Date();
    let nowYear = now.getFullYear();
    let startData = nowYear + "-09-01";
    console.log(now.getDate());
    
    if ((now.getMonth() + 1) < 2 || ((now.getMonth() + 1) == 2 && (now.getDate() < 17))) {
        startData = (nowYear - 1) + "-09-01"
    } else if ((now.getMonth() + 1) < 8) {
        startData = nowYear + "-02-17"
    }
    console.log(startData + " => startData");
    
    const num = new Date(startData);
    console.log("num" + num);
    
    let offset = 0;
    if (num == 0) {
        offset = 1;
    } else if (num == 6) {
        offset = 2;
    }
    console.log("offset:" + offset);
    
    const day =
        Math.floor(
            (Date.parse(now) - Date.parse(startData)) / (1000 * 60 * 60 * 24)
        ) + offset;
    const m = day % 7;
    console.log("m:" + m);
    console.log("day:" + day);
    
    
    if (m == 0) {
        return parseInt(day / 7);
    } else {
        return parseInt(day / 7) + 1;
    }
}

console.log(getClassNum())