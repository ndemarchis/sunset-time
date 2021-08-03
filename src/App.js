/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { disableBodyScroll } from 'body-scroll-lock';
import { ArrowBack, Info, LocalCafe, Settings } from '@material-ui/icons'

import './App.css';
import LocInput from "./comps/LocInput"
import WeatherDisp from "./comps/WeatherDisp"
import InfoModal from "./comps/InfoModal"
import SettingsModal from "./comps/SettingsModal"

const RADAR_KEY = process.env.REACT_APP_RADARKEY;
const OPEN_WEATHER_KEY = process.env.REACT_APP_OPENWEATHERKEY;

const App = () => {

  const [weatherIsLoaded, setWeatherIsLoaded] = useState(false);
  const [coordsIsLoaded, setCoordsIsLoaded] = useState(false);

  const [geoData, setGeoData] = useState({lat: "", lon: "", city: ""});
  const [weatherData, setWeatherData] = useState(null);
  const [date, setDate] = useState(Date());
  const [format, setFormat] = useState("");

  const exclude = "alerts";

  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(CSSRulePlugin);
    disableBodyScroll(document);

    changeBgColor("white", 0.0001)
    changeBgColor("orange", 2)
  }, [])

  const inputHandler = (locData, selectedDate) => {
    setDate(selectedDate)
    fetchCoords(locData)
  }

  const changeBgColor = (str, dur = 0.5) => {
    let v = `linear-gradient(214deg, #ffffff 0%, ${str} 100%)`;
    gsap.to(".Parent", {duration: dur, background: v});
  }

  const fetchCoords = (loc) => {
    let temp = loc
    temp = encodeURIComponent(temp)
    fetch(`https://api.radar.io/v1/geocode/forward?query=${temp}`, {
      headers: {
        'Authorization': RADAR_KEY
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.addresses.length > 0) {
          setGeoData({
            lat: result.addresses[0].latitude, 
            lon: result.addresses[0].longitude, 
            city: result.addresses[0].city
          })
          setCoordsIsLoaded(true)
          fetchWeather();
        } else {
          // show error modal
        }
      },

      (error) => {
        setCoordsIsLoaded(true)
      }
    )
  }

  const fetchWeather = () => {
    if (coordsIsLoaded) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData.lat}&lon=${geoData.lon}&exclude=${exclude}&appid=${OPEN_WEATHER_KEY}`)
    .then(res => res.json())
    .then(
      (result) => {
        setWeatherData(result)
        setWeatherIsLoaded(true)
        changeBgColor("#80b7ff", 2);
      },

      (error) => {
        console.log(error);
        setWeatherIsLoaded(true)
      }
    )
  }}

  const clearWeather = () => {
    setWeatherData(null)
    setWeatherIsLoaded(false)
  }

  const closeModals = () => {
    setInfoModalIsOpen(false)
    setSettingsModalIsOpen(false)
  }

  const settingsSetFormat = (format) => { setFormat(format); console.log(format)}

    return (
      <div className={`Parent`}>
        <div className={`App`}>
          <div className = "siteIdentity">
            <h1 className = "siteTitle">what sunset?</h1>
          </div>
          {!weatherIsLoaded && <LocInput inputHandler = {inputHandler} />}
          {weatherIsLoaded && <WeatherDisp
            data = {weatherData}
            loaded = {weatherIsLoaded}
            city = {geoData.city}
            date = {date}
            format = {format}
            clearWeather = {clearWeather}
          />}
          <div className = "utilsAndCredits">
            <div style={{flex: 1, flexDirection: 'row'}}>
              <a href="javascript:;">
                <ArrowBack onClick = {clearWeather} />
              </a>&nbsp;
              <a href="https://www.buymeacoffee.com/ndemarchis" target="_blank" rel="noreferrer">
                <LocalCafe />
              </a>&nbsp;
              <Settings onClick = {() => setSettingsModalIsOpen(true)}/>&nbsp;
              <Info onClick = {() => setInfoModalIsOpen(true)} />
            </div>
          </div>
          <InfoModal open={infoModalIsOpen} doCloseModal={closeModals}/>
          <SettingsModal open={settingsModalIsOpen} doCloseModal={closeModals} setFormat={settingsSetFormat} />
        </div>
      </div>
    )
}

export default App;
