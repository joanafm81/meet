import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
const locations = extractLocations(mockData);

defineFeature(feature, test => {

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user opened the app', () => {
      AppWrapper = mount(<App />);
    });

    when('the list of all upcoming events is displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });

    then('the event’s details should be collapsed by default', () => {
      expect(AppWrapper.find('.Event.collapsed')).toHaveLength(mockData.length);
    });

  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user opened the app', () => {
      AppWrapper = mount(<App />);
    });

    when('the user selects an event from the list of upcoming events', () => {
      AppWrapper.update();
      AppWrapper.find('.show-details').at(0).simulate('click');

    });

    then('the event should be expanded to display its details', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event').at(0).find('.description')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    let EventWrapper;
    given('the user expanded an event to see its details', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.find('.show-details').at(0).simulate('click');
      //EventWrapper.state({ collapsed: false });
    });

    when('the user closes the details', () => {
      EventWrapper.find('.hide-details').at(0).simulate('click');
    });

    then('the event should be collapsed to hide its details', () => {
      expect(EventWrapper.find('.description')).toHaveLength(0);
      //expect(EventWrapper.state('collapsed')).toBe(true);
    });
  });

});

