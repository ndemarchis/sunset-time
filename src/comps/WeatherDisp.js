import React from "react"
import { View } from "react-native"
import { gsap } from "gsap"
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, SvgIcon, Box, Button} from '@material-ui/core'
import { AcUnit, Cloud, Visibility, Opacity, Waves, FilterHdr, HotTub } from '@material-ui/icons'
import { rotate } from "ol/transform"

import * as utils from "./utils"
import * as algo from "./algo"

import sun from "../sun.svg"
import "./WeatherDisp.css"

class WeatherDisp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            loaded: this.props.loaded,
            city: this.props.city,
            date: this.props.date,
            format: this.props.format,
        };
    }

    componentDidMount() {
        if (this.state.loaded) {
            // gsap.set(".WeatherDisp", {autoAlpha: 0, opacity: 0});
            // gsap.to(".WeatherDisp", 2, {autoAlpha: 1});
            gsap.to(".sunWrapper", {
                duration: 10,
                rotation:"97_cw", 
                top: "-70%",
                right: "-40%",
            });
            gsap.from(".sunWrapper", {
                duration: 10,
                opacity: 0,
            });
        }
    }

    setData() {
        if (!this.state.data) { 
            return "" 
        } else { 

            let formattedData = {};
            let hour = 0; // fix later

            let temp2 = this.state.data.hourly[hour];
            let temp = algo.algo(this.state.data, this.state.date)

            formattedData.clouds = `${temp.weather[0].description} (${temp.clouds}% cover)`;
            formattedData.humidity = `${temp.humidity}%`
            formattedData.visibility = "";
            formattedData.pressure = "";
            formattedData.dew_point = "";
            formattedData.temp = "";
            formattedData.sunset = temp.sunset;
            // console.log(formattedData.clouds)

            if (this.state.format === "imperial") {
                formattedData.visibility = `${(temp.visibility/1609.34).toFixed(2)} miles`;
                formattedData.dew_point = `${((temp.dew_point - 273.15) * 9/5 + 32).toFixed(1)}°F`;
                formattedData.temp = `${((temp.temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;
                formattedData.pressure = `${(temp.pressure/33.86389).toFixed(2)} in Hg`
            } else {
                formattedData.visibility = `${(temp.visibility / 1000).toFixed(2)} km`;
                formattedData.temp = `${(temp.temp - 273.15).toFixed(1)}°C`;
                formattedData.dew_point = `${(temp.dew_point - 273.15).toFixed(1)}°C`;
                formattedData.pressure = `${(temp.pressure)} hPa`
            }

            return formattedData;
            // return this.state.data 
        }
    }

    render() {
        let data = this.setData()
        
        let dataTypes = [
            {
                id: 5,
                title: "temperature",
                path: data.temp,
                avatar: <AcUnit />,
            },{
                id: 0, 
                title: "clouds", 
                path: data.clouds,
                avatar: <Cloud />,
            },{
                id: 1,
                title: "visibility",
                path: data.visibility,
                avatar: <Visibility />,
            },{
                id: 2,
                title: "dewpoint",
                path: data.dew_point,
                avatar: <Opacity />,
            },{
                id: 3,
                title: "relative humidity",
                path: data.humidity,
                avatar: <Waves />,
            },{
                id: 4,
                title: "pressure",
                path: data.pressure,
                avatar: <FilterHdr />,
            }
        ];
        
        let values = dataTypes.map(function (item) {
            let TagName = item.avatar;
            let path = item.path;
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{color: "black", background: "transparent"}} >
                            {TagName}
                        </Avatar>
                    </ListItemAvatar>
                    {item.title}:<b>&nbsp;{path}</b>
                </ListItem>
            )
        });

        return(
            <div className = "WeatherDisp">
                <div className="sunWrapper">
                    <img src={sun} className="sun" alt="revolving sun" style={{zIndex: 0,}}/>
                </div>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <h1 className = "probNumber">78%</h1>
                    <h2 className = "numberSub">
                        {/* sunset at&nbsp;
                        <b>{utils.timeConverter(this.state.data.current.sunset, "time")}</b>
                        &nbsp;in <b>{this.state.city}</b>
                        &nbsp;on <b>{utils.dateConverter(this.state.date, "date")}</b></h2>                         */}
                        sunset at&nbsp;
                        <b>{utils.timeConverter(data.sunset, "time")}</b>
                        &nbsp;in <b>{this.state.city}</b>
                        &nbsp;on <b>{utils.timeConverter(data.sunset, "date")}</b></h2>
                    <List dense="true">
                        {values}
                    </List>
                    {/* {this.state.format} */}
                </View>
            </div>
        )
    }
}

export default WeatherDisp