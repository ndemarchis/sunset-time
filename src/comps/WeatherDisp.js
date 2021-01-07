import React from "react"
import { View } from "react-native"

class WeatherDisp extends React.Component {
    constructor() {
        super();
        this.state = {
            something: ""
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }

    setData() {
        if (!this.state.data) { return "" } else { return this.state.data }
    }

    render() {
        return(
            <div className = "WeatherDisp">
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <h1 className = "probNumber">{this.setData()}</h1>
                </View>
            </div>
        )
    }
}

export default WeatherDisp