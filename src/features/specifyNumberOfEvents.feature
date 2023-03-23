Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given the user hasn’t specified the number of events they want to see
When the user opens the app / main page
Then the user should see 32 events by default

Scenario: User can change the number of events they want to see.
Given the user hasn’t specified the default number of events to see / the user has specified the number of events to see (and they want to change it)
When the user opens the main page /sees the list of all upcoming events
Then the user should be able to change the number of events they want to see (e.g. at the bottom of the page)