import React from "react"
import {Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl} from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { View } from "react-native"

import * as utils from "./utils"

import "./LocInput.css";

class LocInput extends React.Component {
    constructor() {
        super();
        this.today = new Date();
        this.fortyEightHours = new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000));
        this.state = { 
            locText: '',
            selectedDate: this.today,
            selectedFormat: 'imperial',
        };
        // this.setState({today: this.tomorrowGen()})
    }

    onComponentMount() {
    }

    tomorrowGen(date) {
      let s = date
      s.setDate(s.getDate() + 1)
      return s
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.locText) {
          this.props.inputHandler(this.state.locText, this.state.selectedDate, this.state.selectedFormat)
        }
    }

    myKeypressHandler = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        this.mySubmitHandler();
      }
    };
    
    render() {
      return (
        <div className="LocInput">
          <form onSubmit={this.mySubmitHandler}>
          {/* <form onSubmit={this.props.handler}> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TextField 
                id="outlined-basic" 
                label="Location" 
                variant="outlined" 
                onChange={(event) => {this.setState({locText: event.target.value});}} 
                onKeyPress={this.myKeypressHandler}
              />
              {/* <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                // label="Date picker inline"
                value={this.state.selectedDate}
                autoOk={true} 
                disablePast={true} 
                maxDate={this.fortyEightHours} 
                maxDateMessage={"dates are only allowed 48 hours in the future"}
                onChange={(date, value) => {
                  this.setState({selectedDate: date});}}
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
                  value={this.state.selectedFormat}
                  onChange={(event) => {this.setState({selectedFormat: event.target.value});}}
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
  }

export default LocInput