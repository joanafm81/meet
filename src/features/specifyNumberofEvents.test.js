import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import NumberofEvents from '../NumberofEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
//const locations = extractLocations(mockData);

defineFeature(feature, test => {

  test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
    given('the user hasn’t specified the number of events they want to see', () => {

    });

    let AppWrapper;
    when('the user opens the app / main page', () => {
      AppWrapper = mount(<App />)

    });

    then('the user should see 32 events by default', () => {
      AppWrapper.update();
      expect(AppWrapper.find(NumberofEvents).state('numberofevents')).toBe(32);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {

    given('the user hasn’t specified the default number of events to see / the user has specified the number of events to see (and they want to change it)', () => {

    });

    let AppWrapper;
    when('the user opens the main page /sees the list of all upcoming events', () => {
      AppWrapper = mount(<App />);

    });

    let NumberOfEventsWrapper;
    then('the user should be able to change the number of events they want to see (e.g. at the bottom of the page)', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberofEvents);
      const eventObject = { target: { value: 12 } };
      NumberOfEventsWrapper.find('#number-of-events').simulate('change', eventObject);
      expect(NumberOfEventsWrapper.state('numberofevents')).toBe(12);

    });
  });

});