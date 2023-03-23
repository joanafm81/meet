Feature: Show/hide an event's details

Scenario: An event element is collapsed by default.
Given the user opened the app
When the list of all upcoming events is displayed
Then the event’s details should be collapsed by default

Scenario: User can expand an event to see its details.
Given the user opened the app
When the user selects an event from the list of upcoming events
Then the event should be expanded to display its details

Scenario: User can collapse an event to hide its details.
Given the user expanded an event to see its details
When the user closes the details
Then the event should be collapsed to hide its details