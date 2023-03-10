import React, { Component } from 'react';

class NumberofEvents extends Component {
  state = {
    numberofevents: 32
  }

  handleInputChanged = (event) => {
    let value = parseInt(event.target.value);

    if (value < 1) value = 1;

    this.setState({
      numberofevents: value
    });
  };

  render() {
    return (
      <div>
        <label for="number-of-events">Number of Events:</label>
        <input
          id="number-of-events"
          type="number"
          value={this.state.numberofevents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberofEvents;