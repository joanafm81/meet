// src/__tests__/NumberofEvents.test.js

import React from 'react';
import { shallow } from 'enzyme';
import NumberofEvents from '../NumberofEvents';

describe('<NumberofEvents /> component', () => {
  let NumberofEventsWrapper;
  beforeAll(() => {
    NumberofEventsWrapper = shallow(<NumberofEvents updateEvents={() => { }} />);
  });

  test('render textbox with number of events', () => {
    expect(NumberofEventsWrapper.find('#number-of-events')).toHaveLength(1);
  });

  test('render 32 events by default', () => {
    expect(NumberofEventsWrapper.state("numberofevents")).toBe(32);
  });

  test('change state when text input changes', () => {
    const eventObject = { target: { value: 12 } };
    NumberofEventsWrapper.find('#number-of-events').simulate('change', eventObject);
    expect(NumberofEventsWrapper.state('numberofevents')).toBe(12);
  });

  test('number of events is at least 1', () => {
    const eventObject = { target: { value: 0 } };
    NumberofEventsWrapper.find('#number-of-events').simulate('change', eventObject);
    expect(NumberofEventsWrapper.state('numberofevents')).toBe(1);
  });

});