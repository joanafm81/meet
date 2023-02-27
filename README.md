# Project description

# How to get the project running

[Meet] (https://joanafm81.github.io/meet/)

# Project dependencies

# Features, user stories and scenarios


**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

**User story:** As a user, I should be able to “show/hide the details of an event/an event’s details” so that I can see the details of an event/an event’s details.

*Scenario 1: An event element is collapsed by default.*

**Given** the user opened the app

**When** the list of all upcoming events is displayed

**Then** the event’s details should be collapsed by default

*Scenario 2: User can expand an event to see its details.*

**Given** the user opened the app

**When** the user selects an event from the list of upcoming events

**Then** the event should be expanded to display its details

*Scenario 3: User can collapse an event to hide its details.*

**Given** the user expanded an event to see its details

**When** the user closes the details 

**Then** the event should be collapsed to hide its details


**FEATURE 3: SPECIFY NUMBER OF EVENTS**

**User story:** As a user, I should be able to “specify the number of events” so that I can see the number of events I want.

*Scenario 1: When user hasn’t specified a number, 32 is the default number.*

**Given** the user hasn’t specified the number of events they want to see

**When** the user opens the app / main page

**Then** the user should see 32 events by default

*Scenario 2: User can change the number of events they want to see.*

**Given** the user hasn’t specified the default number of events to see / the user has specified the number of events to see (and they want to change it)

**When** the user opens the main page /sees the list of all upcoming events

**Then** the user should be able to change the number of events they want to see (e.g. at the bottom of the page)


**FEATURE 4: USE THE APP WHEN OFFLINE**

**User story:** As a user, I should be able “use the app offline” so that I can use the app when there’s no internet connection.

*Scenario 1: Show cached data when there’s no internet connection.*

**Given** there’s no internet connection

**When** the user browses the app

**Then** the app should show cached data

*Scenario 2: Show error when user changes the settings (city, time range).*

**Given** there’s no internet connection

**When** the user tries to change the settings

**Then** the app should show an error


**FEATURE 5: DATA VISUALIZATION**

**User story:** As a user, I should be able to “visualize data about events” so that I can see the number of upcoming events.

*Scenario 1: Show a chart with the number of upcoming events in each city.*

**Given** the user opened the app / the main page and hasn’t searched for a city

**When** the list of all upcoming events is displayed

**Then** the app should show a chart with the number of upcoming events in each city


