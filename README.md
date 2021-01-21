# Project Name

**Author**: Stephen Webber
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

[Trello](https://trello.com/b/gT95dxpq/cityexplorer)

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

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Sat at table with Seamus, Brendan, and Jason D for lab 6 and 7. 
