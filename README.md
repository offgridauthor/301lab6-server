# Project Name

**Author**: Stephen Webber
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

Building a stand-alone back end to interact with a static front-end. Data is requested from six third party APIs and is sent to client's browser. Data is persisted using SQL database.


[Link to Public Trello Board](https://trello.com/b/gT95dxpq/cityexplorer)

## Getting Started

[Repo](https://github.com/offgridauthor/301lab6-server)

[Live Site](https://slw-301lab6.herokuapp.com/)

[Front End](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/)

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

*Dependencies*

`npm install -S cors dotenv express pg superagent`

`psql -d cityexplorer schema.sql`

Dotenv must contain: 

`GEOCODE_API_KEY` 
`WEATHER_API_KEY` from weatherbit.io
`PARKS_API_KEY` from nps.gov
`DATABASE_URL` to postgres `cityexplorer` db

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.-->

1/18 - Built API server for City Explorer app.
1/19 - API Data for location, weather, and NPS functional
1/20 - Added movies and restaurants

### Lab 6 - Node, npm, and express

Estimate of time needed to complete: _4 hours___

Start time: _2:20____

Finish time: _7:45__

Actual time needed to complete: _5 hours___

### Lab 7 - APIs

Estimate of time needed to complete: __4 hours__

Start time: __2pm__

Finish time: __9:20__

Actual time needed to complete: __7 hours___

### Lab 8 - Persistence with a SQL Database

Estimate of time needed to complete: __5 hours_

Start time: __1:45__

Finish time: __9:30__

Actual time needed to complete: __6.5 hours__

### Lab 9 - SQL Continued

Estimate of time needed to complete: __6 hours__

Start time: __1:45__

Finish time: __9:45__

Actual time needed to complete: __8 hours__

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

Sat at table with Seamus, Brendan, and Jason D for lab 6 and 7. 

Sat at table with Carly, Darci and Jason Q for Lab 8.
