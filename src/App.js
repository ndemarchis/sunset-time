import React from "react";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

import * as keys from "./comps/api"
import * as utils from "./comps/utils"
import './App.css';

import LocInput from "./comps/LocInput"
import WeatherDisp from "./comps/WeatherDisp"

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

    this.inputHandler = this.inputHandler.bind(this)
  }

  componentDidMount() {
    // document.body.style.background = "linear-gradient(204deg, #ff0000 0%, #00ff00 62%, #0000ff 100%)";
    gsap.to(document.getElementById("root"), {background: "linear-gradient(56deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"})
    // this.fetchCoords("Enola, PA");
    // this.fetchWeather();
  }

  inputHandler(data) {
    let loc = data;
    this.setState({
      locText: data,
    })
    this.fetchCoords(loc)
  }

  displayHandler(data) {

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
        if (result.addresses.length > 0) {
          this.setState({
            // locationData: result,
            lat: result.addresses[0].latitude,
            lon: result.addresses[0].longitude,
            coordsIsLoaded: true,
          });
          this.fetchWeather();
        }
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
    if (!this.state.weatherIsLoaded) { this.sunsetTime = "" } else {
      this.sunsetTime = utils.timeConverter(this.state.weatherData.current.sunset, "time")
    }
    return (
      <div className="App">
        <h1>what sunset?</h1>
        <LocInput inputHandler = {this.inputHandler} />
        <WeatherDisp data = {this.state.weatherData} />
        {this.sunsetTime}
      </div>
    )}
}

export default App;
