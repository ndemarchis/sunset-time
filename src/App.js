import React from "react";
import OpenWeatherKey from "./comps/api"
import * as utils from "./comps/utils"
import './App.css';

class App extends React.Component {

  constructor(props) {
    super()
    this.state = {
      weatherIsLoaded: false,
      lat: 40,
      lon: -77,
      exclude: "alerts",
    }
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=${this.state.exclude}&appid=${OpenWeatherKey}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          weatherData: result,
          weatherIsLoaded: true,
        });
      },

      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    if (!this.state.weatherIsLoaded) {
      return <div />
    } else {
    return (
      <div className="App">
        <h1>hey</h1>
        <p>{utils.timeConverter(this.state.weatherData.current.sunset)}</p>
      </div>
    )}}
}

export default App;
