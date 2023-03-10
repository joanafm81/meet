// src/Event.js

import React, { Component } from "react";

class Event extends Component {
  state = {
    collapsed: true
  }

  handleItemClicked = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { event } = this.props;

    return <div className={"Event" + (this.state.collapsed ? " collapsed" : "")}>
      <h2 className="title">{event.summary}</h2>
      <p>
        <span className="start-date">{event.start.dateTime} ({event.start.timeZone})</span><span className="location">@{event.location}</span>
      </p>
      {this.state.collapsed ?
        <button className="show-details" onClick={this.handleItemClicked}>Show Details</button>
        :
        <><p>
          <a className="html-link" href={event.htmlLink}>See details on Google Calendar</a>
        </p>
          <p>
            <span className="description">{event.description}</span>
          </p>

          <button className="hide-details" onClick={this.handleItemClicked}>Hide Details</button>
        </>
      }
    </div>
  }
}
export default Event;