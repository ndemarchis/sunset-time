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
      submitted: false,
      weatherIsLoaded: false,
      coordsIsLoaded: false,

      locText: "",
      weatherData: null,
      lat: 90,
      lon: 90,
      exclude: "alerts",
    }
    this.inputHandler = this.inputHandler.bind(this)
  }

  componentDidMount() {
    // document.body.style.background = "linear-gradient(204deg, #ff0000 0%, #00ff00 62%, #0000ff 100%)";
    // gsap.to(document.getElementById("root"), {background: "linear-gradient(56deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"})
    // this.fetchCoords("Enola, PA");
    // this.fetchWeather();
    gsap.registerPlugin(CSSRulePlugin);
    this.changeBgColor("white", 0.0001)
    this.changeBgColor("orange", 2)
  }

  inputHandler(data) {
    let loc = data;
    this.setState({
      locText: data,
    })
    this.fetchCoords(loc)
  }

  changeBgColor(str, dur = 0.5) {
    let v = `linear-gradient(214deg, #ffffff 0%, ${str} 100%)`;
    gsap.to(".Parent", {duration: dur, background: v});
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

        this.changeBgColor("#80b7ff");
        // console.log(`fetched weather: ${this.state.weatherData}`)
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
    let locInput, weatherDisp;
    if (!this.state.weatherIsLoaded) { 
      weatherDisp = "" 
      locInput = <LocInput inputHandler = {this.inputHandler} />
    } else {
      weatherDisp = <WeatherDisp data = {this.state.weatherData} />
      // this.sunsetTime = utils.timeConverter(this.state.weatherData.current.sunset, "time").toString()
    }

    return (
      <div className={`Parent`}>
        <div className={`App`}>
          <h1>what sunset?</h1>
          {locInput}
          {weatherDisp}
        </div>
      </div>
    )}
}

export default App;
