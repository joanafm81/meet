import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
//import { getEvents, extractLocations } from './api';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';


class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    warningText: '',
    showWelcomeScreen: undefined
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

    if (!navigator.onLine) {
      this.setState({
        warningText: 'You seem to be offline; events were pulled from cache.'
      });
    }
    else {
      this.setState({
        warningText: ''
      });
    }
  }


  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <WarningAlert text={this.state.warningText} />
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch locations={this.state.locations} updateEvents={(location) => { this.updateEvents(location) }} />
        <NumberofEvents updateEvents={(count) => { this.updateEvents(undefined, count) }} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        warningText: 'You seem to be offline; events were pulled from cache.'
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
}

export default App;
