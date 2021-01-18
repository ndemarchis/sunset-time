import React from "react";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Dialog } from '@material-ui/core';
import { ArrowBack, Info, LocalCafe } from '@material-ui/icons'
import { View } from "react-native"

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
      date: Date(),
      format: "",
      lat: 90,
      lon: 90,
      exclude: "alerts",
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.clearWeather = this.clearWeather.bind(this)
  }

  componentDidMount() {
    // document.body.style.background = "linear-gradient(204deg, #ff0000 0%, #00ff00 62%, #0000ff 100%)";
    // gsap.to(document.getElementById("root"), {background: "linear-gradient(56deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"})
    // this.fetchCoords("Enola, PA");
    // this.fetchWeather();
    gsap.registerPlugin(CSSRulePlugin);

    disableBodyScroll(document);

    this.changeBgColor("white", 0.0001)
    this.changeBgColor("orange", 2)
  }

  infoDialog() {
    return(
      <Dialog>
        hey
      </Dialog>
    )
  }

  inputHandler(locData, selectedDate, selectedFormat) {
    let loc = locData;
    this.setState({
      locText: locData,
      date: selectedDate,
      format: selectedFormat,
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
            city: result.addresses[0].city,
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

        this.changeBgColor("#80b7ff", 2);
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

  clearWeather() {
    // window.location.href="javascript:;"
    this.setState({
      weatherData: null,
      weatherIsLoaded: false,
    })
  }

  render() {
    let locInput, weatherDisp;
    if (!this.state.weatherIsLoaded) { 
      weatherDisp = "" 
      locInput = <LocInput inputHandler = {this.inputHandler} />
    } else {
      weatherDisp = <WeatherDisp 
        data = {this.state.weatherData} 
        loaded = {this.state.weatherIsLoaded} 
        city = {this.state.city}
        date = {this.state.date}
        format = {this.state.format}
        clearWeather = {this.clearWeather}
      />
      // this.sunsetTime = utils.timeConverter(this.state.weatherData.current.sunset, "time").toString()
    }

    return (
      <div className={`Parent`}>
        <div className={`App`}>
          <div className = "siteIdentity">
            <h1 className = "siteTitle">what sunset?</h1>
          </div>
          {locInput}
          {weatherDisp}
          <div className = "utilsAndCredits">
            <View style={{flex: 1, flexDirection: 'row'}}>
              <a href="javascript:;">
                <ArrowBack onClick = {this.clearWeather} />
              </a>&nbsp;
              <a href="https://www.buymeacoffee.com/ndemarchis" target="_blank" rel="noreferrer">
                <LocalCafe />
              </a>&nbsp;
              <a href="javascript:;">
                <Info onClick = {console.log(this.infoDialog)} />
              </a>
            </View>
          </div>
        </div>
      </div>
    )}
}

export default App;
