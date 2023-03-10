// src/__tests__/Event.test.js

import React from 'react';
import { shallow } from 'enzyme';
//import App from '../App';
//import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render event basic info', () => {
    expect(EventWrapper.find('.title')).toHaveLength(1);
    expect(EventWrapper.find('.start-date')).toHaveLength(1);
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });

  test('render event show details button', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  });

  test('event is collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(EventWrapper.find('.Event.collapsed')).toHaveLength(1);
  });

  test('event should be expanded to display its details', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.show-details').at(0).simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
    expect(EventWrapper.find('.html-link')).toHaveLength(1);
    expect(EventWrapper.find('.description')).toHaveLength(1);
  });

  test('event should be collapsed to hide its details', () => {
    EventWrapper.setState({
      collapsed: false
    });
    EventWrapper.find('.hide-details').at(0).simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });


});