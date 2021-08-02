export function timeConverter(UNIX_timestamp, outFormat = "time"){
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
    if (outFormat.includes("time")) {
        out += `${hour >= 12 ? hour - 12 : hour}:${min}\xa0${suffix}`;
    } if (outFormat.includes("date")) {
        out += `${month}.\xa0${date}`
    }
    return out
};

export function dateConverter(date, outFormat = "date") {
    var a = new Date(date).getTime() / 1000;
    return(timeConverter(a, outFormat));
}