import React from "react"
import { View } from "react-native"
import { gsap } from "gsap"
import { List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@material-ui/core'
// import { AcUnit, Cloud, Visibility, Opacity, Waves, FilterHdr } from '@material-ui/icons'

class WeatherDisp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentDidMount() {
        gsap.set(this.div, {autoAlpha: 0, opacity: 0});
        gsap.to(this.div, {duration: 2, autoAlpha: 1, opacity: 1})
    }

    setData() {
        if (!this.state.data) { return "" } else { return this.state.data }
    }

    render() {
        let data = this.setData()
        
        let dataTypes = [
            {
                id: 0, 
                title: "Cloud Cover", 
                path: "current.clouds", 
                avatar: "Cloud",
            },{
                id: 1,
                title: "Visibility",
                path: "current.visibility",
                avatar: "Visibility",
            },{
                id: 2,
                title: "Dewpoint",
                path: "current.dew_point",
                avatar: "Opacity",
            },{
                id: 3,
                title: "Relative Humidity",
                path: "current.humidity",
                avatar: "Waves",
            },{
                id: 4,
                title: "Pressure",
                path: "current.pressure",
                avatar: "FilterHdr",
            }
        ];
        
        let values = dataTypes.map(function (item) {
            let TagName = item.avatar;
            let path = item.path;
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            {React.createElement(TagName, {})}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                        primary = {`${item.title}: ${data[path]}`}
                    />
                </ListItem>
            )
        });

        return(
            <div className = "WeatherDisp">
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <h1 className = "probNumber">{data.lat}79%</h1>
                    <List dense="true">
                        {/* <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            <AcUnit />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Single-line item"
                        />
                        </ListItem> */}
                        {values}
                    </List>
                </View>
            </div>
        )
    }
}

export default WeatherDisp