import React from "react";

import * as keys from "./comps/api"
import * as utils from "./comps/utils"
import './App.css';

import LocInput from "./comps/LocInput"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      weatherIsLoaded: false,
      coordsIsLoaded: false,

      locText: "",
      lat: 90,
      lon: 90,
      exclude: "alerts",
    }

    this.handler = this.handler.bind(this)
  }

  componentDidMount() {
    // this.fetchCoords("Enola, PA");
    // this.fetchWeather();
  }

  handler(data) {
    let loc = data;
    this.setState({
      locText: data
    })
    this.fetchCoords(loc)

  }

  fetchCoords(loc) {
    let temp = loc
    temp = encodeURIComponent(temp)
    fetch(`https://api.radar.io/v1/geocode/forward?query=${temp}`, {
      headers: {
        'Authorization': keys.RadarKey
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          // locationData: result,
          lat: result.addresses[0].latitude,
          lon: result.addresses[0].longitude,
          coordsIsLoaded: true,
        });
        this.fetchWeather();
      },

      (error) => {
        this.setState({
          coordsIsLoaded: true,
          error
        });
      }
    )
  }

  fetchWeather() {
    if (this.state.coordsIsLoaded) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=${this.state.exclude}&appid=${keys.OpenWeatherKey}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          weatherData: result,
          weatherIsLoaded: true,
        });
        console.log(`fetched weather: ${this.state.weatherData}`)
      },

      (error) => {
        this.setState({
          weatherIsLoaded: true,
          error
        });
      }
    )
  }}

  render() {
    if (!this.state.weatherIsLoaded) {
      this.sunsetTime = ""
    } else {
      this.sunsetTime = utils.timeConverter(this.state.weatherData.current.sunset)
    }
    return (
      <div className="App">
        <h1>hey</h1>
        <LocInput handler = {this.handler} />
        {this.sunsetTime}
      </div>
    )}
}

export default App;
