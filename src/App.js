import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32
  }

  updateEvents = (location, eventCount) => {

    if (location) {
      this.setState({
        currentLocationlocation: location
      });
    }
    else {
      location = this.state.currentLocation;
    }
    if (eventCount) {
      this.setState({
        numberOfEvents: eventCount
      });
    }
    else {
      eventCount = this.state.numberOfEvents;
    }

    getEvents().then((events) => {
      let locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);

      if (eventCount && eventCount < locationEvents.length) {
        locationEvents = locationEvents.slice(0, eventCount)
      }
      this.setState({
        events: locationEvents
      });
    });
  }


  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={(location) => { this.updateEvents(location) }} />
        <NumberofEvents updateEvents={(count) => { this.updateEvents(undefined, count) }} />
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} />
      </div>
    );
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
}

export default App;
