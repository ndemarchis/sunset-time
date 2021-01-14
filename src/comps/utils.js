export function timeConverter(UNIX_timestamp, format = "time"){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var suffix = hour >= 12 ? "p.m." : "a.m."
    min = ("0" + min).slice(-2)
    // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    let out = "";
    if (format.includes("time")) {
        out += `${hour >= 12 ? hour - 12 : hour}:${min} ${suffix}`;
    } if (format.includes("day")) {
        out += ""
    }
    return out
};