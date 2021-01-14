import React from "react"
import { View } from "react-native"
import { gsap } from "gsap"
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, SvgIcon, Box} from '@material-ui/core'
import { AcUnit, Cloud, Visibility, Opacity, Waves, FilterHdr } from '@material-ui/icons'
import { rotate } from "ol/transform"

import * as utils from "./utils"

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

            let temp = this.state.data;
            if (this.state.format === "imperial") {
                // add robustness for arbitrary time
            } else {

            }

            return
            // return this.state.data 
        }
    }

    render() {
        let data = this.setData()
        
        let dataTypes = [
            {
                id: 0, 
                title: "Cloud Cover", 
                path: data.current.clouds, 
                avatar: <Cloud />,
                color: "blue",
            },{
                id: 1,
                title: "Visibility",
                path: data.current.visibility,
                avatar: <Visibility />,
                color: "green",
            },{
                id: 2,
                title: "Dewpoint",
                path: data.current.dew_point,
                avatar: <Opacity />,
                color: "yellow",
            },{
                id: 3,
                title: "Relative Humidity",
                path: data.current.humidity,
                avatar: <Waves />,
                color: "orange",
            },{
                id: 4,
                title: "Pressure",
                path: data.current.pressure,
                avatar: <FilterHdr />,
                color: "red",
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
                    <b>{item.title}</b>: {path}
                </ListItem>
            )
        });

        return(
            <div className = "WeatherDisp">
                <div className="sunWrapper">
                    <img src={sun} className="sun" alt="revolving sun" style={{zIndex: 0,}}/>
                </div>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <h1 className = "probNumber">79%</h1>
                    <h2 className = "numberSub">sunset at <b>{utils.timeConverter(data.current.sunset)}</b> in <b>{this.state.city}</b></h2>
                    <List dense="true">
                        {values}
                    </List>
                </View>
            </div>
        )
    }
}

export default WeatherDisp