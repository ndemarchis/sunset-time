import React, {useState} from "react"
import {Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl} from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
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
        event.preventDefault();
        if (locText) {
          props.inputHandler(locText, selectedDate, selectedFormat)
        }
    }

    const myKeypressHandler = (e) => {
      //   //it triggers by pressing the enter key
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
            <TextField 
              id="outlined-basic" 
              label="Location" 
              variant="outlined" 
              onChange={(event) => setLocText(event.target.value)}
              onKeyPress={myKeypressHandler()}
            />
            {/* <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              // label="Date picker inline"
              value={selectedDate}
              autoOk={true} 
              disablePast={true} 
              maxDate={fortyEightHours} 
              maxDateMessage={"dates are only allowed 48 hours in the future"}
              onChange={(date, value) => {
                setSelectedDate(date);
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> */}
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Data format
            </InputLabel>
            <Select
                // labelId="demo-simple-select-filled-label"
                id="demo-simple-select-outlined"
                label="Data format"
                value={selectedFormat}
                onChange={(event) => setSelectedFormat(event.target.value)}
                displayEmpty
              >
                <MenuItem value={"metric"} default >Metric</MenuItem>
                <MenuItem value={"imperial"}>Imperial</MenuItem>
              </Select>
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