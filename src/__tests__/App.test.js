// src/__tests__/App.test.js

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberofEvents from '../NumberofEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {

  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberofEvents', () => {
    expect(AppWrapper.find(NumberofEvents)).toHaveLength(1);
  });

});

describe('<App /> integration', () => {

  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "numberOfEvents" state as a prop to Eventlist', async () => {
    const AppWrapper = mount(<App />);
    const AppNumberofEventsState = AppWrapper.state('numberOfEvents');
    expect(AppNumberofEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().numberOfEvents).toEqual(AppNumberofEventsState);
    AppWrapper.unmount();
  });

  test('display only the "numberOfEvents" events set in the textbox', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    const maxEvents = 3;
    AppWrapper.setState({ events: allEvents });
    //const AppNumberofEventsState = AppWrapper.state('numberOfEvents');
    const EventListWrapper = AppWrapper.find(EventList);
    const NumberofEventsWrapper = AppWrapper.find(NumberofEvents);
    const eventObject = { target: { value: maxEvents } };
    await NumberofEventsWrapper.find('#number-of-events').simulate('change', eventObject);
    expect(AppWrapper.state('events').length).toBeLessThanOrEqual(maxEvents);
    //expect(EventListWrapper.find('.EventItem').length).toBeLessThanOrEqual(maxEvents);
    AppWrapper.unmount();
  });
});