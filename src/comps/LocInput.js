import React, {useState} from "react"
import {Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl, InputAdornment, Input} from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import DateFnsUtils from '@date-io/date-fns';
import { View } from "react-native"

import * as utils from "./utils"

import "./LocInput.css";

const LocInput = (props) => {

    const today = new Date();
    const fortyEightHours = new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000));

    const [locText, setLocText] = useState('')
    const [selectedDate, setSelectedDate] = useState(today)
    const [selectedFormat, setSelectedFormat] = useState('imperial')

    const tomorrowGen = (date) => {
      let s = date
      s.setDate(s.getDate() + 1)
      return s
    }

    const mySubmitHandler = (event) => {
        // event.preventDefault();
        if (locText) {
          props.inputHandler(locText, selectedDate)
        }
    }

    const myKeypressHandler = (e) => {
        //it triggers by pressing the enter key
      // if (e.keyCode === 13) {
      //   mySubmitHandler();
      // }
    };
    
    return (
      <div className="LocInput">
        <form onSubmit={mySubmitHandler}>
        {/* <form onSubmit={props.handler}> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <InputLabel htmlFor="outlined-basic">Location</InputLabel>
            <Input 
              id="outlined-basic" 
              type="text"	
              label="Location" 
              variant="outlined" 
              onChange={(event) => setLocText(event.target.value)}
              onKeyPress={myKeypressHandler()}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    aria-label="submit form"
                    onClick={() => mySubmitHandler()}
                  />
                </InputAdornment>
              }
            />
            <br />
            <Button variant="contained" color="primary" type='submit' className="locSubmitButton">
              Submit
            </Button>
          </View>
          </MuiPickersUtilsProvider>
        </form>
      </div>
    );
  }

export default LocInput