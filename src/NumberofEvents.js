import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberofEvents extends Component {
  state = {
    numberofevents: 32,
    errorText: ''
  }

  handleInputChanged = (event) => {
    let value = parseInt(event.target.value);

    if (value < 1 || value > 32) {
      this.setState({
        numberofevents: value,
        errorText: 'Select a number from 1 to 32.'
      });
    } else {
      this.setState({
        numberofevents: value,
        errorText: ''
      });
    }

    this.props.updateEvents(value);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.errorText} />
        <label htmlFor="number-of-events">Number of Events:</label>
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