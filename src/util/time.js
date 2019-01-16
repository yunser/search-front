const format = function (date, f) {
    var o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(),    // day
        'h+': date.getHours(),   // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3),  // quarter
        'S': date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(f)) f = f.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(f)) f = f.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
    return f
}

/* eslint-disable */

function offset(value) {
    //计算出相差天数
    var days = Math.floor(value / (24 * 3600 * 1000));

    var years = Math.floor(days / 365);

    var months = Math.floor(days / 30);

    //计算出小时数
    var leave1 = value % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);

    let totalSecond = value / 1000
    let day = Math.floor(value / 24 / 3600 / 1000)
    let hour = Math.floor((value - day * 24 * 3600 * 1000) / (24 * 3600 * 1000))
    let minute = 1
    let second = (value % 1000)
    return `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`
}

export {format, offset}
