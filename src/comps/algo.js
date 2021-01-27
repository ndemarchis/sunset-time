import * as utils from "./utils"

export function algo(data, date, hour = 0) {
    let dateUnix = dateConverter(date);
    // let daysDiff = Math.round((dateUnix - today) / 86400);
    let sunsetTimes = data.daily.map(a => a.sunset);
    if (sunsetTimes === []) {
        throw new Error ("No sunsets upcoming!");
    }
    let i = 0
    while (sunsetTimes[i] < dateUnix) {
        i = i + 1;
    }
    // i is the index of the next sunset
    let daySunsetTime = sunsetTimes[i];
    let hoursUntilNextSunset = Math.round((daySunsetTime - dateUnix) / 3600);
    let dataToReturn = data.hourly[hoursUntilNextSunset];
    dataToReturn.sunset = Math.round(daySunsetTime);
    return dataToReturn;
}

// export function algo(data, date, hour = 0) {
//     let dateUnix = dateConverter(date);
//     let today = dateConverter(new Date());
//     let daysDiff = Math.round((dateUnix - today) / 86400);
//     let sunsetTimes = data.daily.map(a => a.sunset);
//     let daySunsetTime = sunsetTimes[daysDiff];
//     let hoursUntilNextSunset;
//     if (daySunsetTime < dateUnix) { // if sunset is later than current time on selected day
//         hoursUntilNextSunset = Math.round((daySunsetTime - dateUnix) / 3600);
//     } else if (daySunsetTime > dateUnix) {
//         hoursUntilNextSunset = Math.round((sunsetTimes[daysDiff + 1] - dateUnix) / 3600);
//     }
//     console.log(hoursUntilNextSunset);
//     let sunsetHourData = data.hourly[hoursUntilNextSunset];
//     // return utils.timeConverter(sunsetHourData.dt, "date time");
//     // return "79%"
//     // console.log(sunsetHourData)
//     return sunsetHourData;
// }

function dateConverter(date) {
    var a = new Date(date).getTime() / 1000;
    return(a);
}