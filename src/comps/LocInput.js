import React from "react"
import {Grid, Paper, TextField, Button} from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { View } from "react-native"

class LocInput extends React.Component {
    constructor() {
        super();
        this.state = { 
            locText: '',
            selectedDate: new Date(),
        };
        this.today = new Date();
        this.tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
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
          this.props.inputHandler(this.state.locText)
        }
    }

    myKeypressHandler = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        this.mySubmitHandler();
      }
    };

    myChangeHandler = (event) => {
      this.setState({locText: event.target.value});
    }

    render() {
      return (
        <div className="LocInput">
          <form onSubmit={this.mySubmitHandler}>
          {/* <form onSubmit={this.props.handler}> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TextField id="outlined-basic" label="Location" variant="outlined" onChange={this.myChangeHandler} onKeyPress={this.myKeypressHandler}/>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                // label="Date picker inline"
                value={this.state.selectedDate}
                onChange={(date) => this.setState({selectedDate: date})}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
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