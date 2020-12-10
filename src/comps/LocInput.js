import React from "react"

class LocInput extends React.Component {
    constructor() {
        super();
        this.state = { 
            locText: '' 
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        this.props.handler(this.state.locText)
    }

    myChangeHandler = (event) => {
      this.setState({locText: event.target.value});
    }

    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
        {/* <form onSubmit={this.props.handler}> */}
            <input type='text' onChange={this.myChangeHandler} />
            <input type='submit' />
        </form>
      );
    }
  }

export default LocInput