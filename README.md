# PubGTour - A Case Study

## Problem Statement
Build a system to list PubG (game) tournaments, show statistics of matches of a
tournament and bookmark favourite match.

## Requirements

- The application needs to fetch PubG tournaments data by registering with the following link
and get API key required to call the APIs.
● https://developer.pubg.com/

- Reference APIs:
  1. https://api.pubg.com/tournaments
  2. https://api.pubg.com/tournaments/<tournament-ID>
  3. https://api.pubg.com/shards/tournament/matches/82821ad4-1b53-48e0-b116-1e33b89bb6c3
  
- A frontend web app where the user can register/login to the application, list PubG
tournaments, show matches details for selected tournament and bookmark favourite
match.
  - On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the home page.
  - Proper navigation links for all the pages should be available within pages.
  - Error handling should be implemented across pages. Appropriate messages should be    displayed for the same. Success messages should be displayed for the User Registration.
  - Logout feature should be implemented.

- User can add match into favourite list and should be able to view the favourite matches for
user.

## Modules

### UI (User interface) - should be able to
1. List PubG tournaments and summary of matches for each tournament
2. View details of a match with in a tournament
3. Add a match to favourite list
4. should be able to see favourite matches
5. UI should be responsive which can run smoothly on various devices
6. UI should be appealing and user friendly.

### UserService - should be able to manage user accounts.

### FavouriteService - should be able to store all the favourite PubG matches for a user

## Tech Stack

- Spring Boot
- MySQL, MongoDB
- Angular
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules

### Building frontend
- Building responsive views:
    1. Register/Login
    2. Show list of PubG tournaments - populating from external API
    3. Show match details - populating from external API
    4. Build a view to show favourite matches
- Using Services to populate these data in views
- Stitching these views using Routes and Guards
- Making the UI Responsive
- Unit Tests should be created for the Components and Services
- E2E scripts using protractor should be created for the functional flows
- Implement CI - continuous Integration ( use .gitlab-ci.yml)
- Dockerize the frontend (create dockerfile, docker-compose.yml and get it executed through docker compose)

### Note: FrontEnd and all the backend services should be dockerized and run through docker-compose

### Building the UserService
- Creating a server in Spring Boot to facilitate user registration and login with MySQL as backend. Upon login, JWT token has to be generated. It has to be used in the Filters set in other services.
- Writing swagger documentation
- Unit Testing of the entire code which involves the positive and negative scenarios
- Implement continuous Integration CI ( use .gitlab-ci.yml)
- Dockerize the UserService (create dockerfile, docker-compose.yml and get it executed through docker compose)


### Building the Favourite Service
- Building a server in Spring Boot to facilitate CRUD operation over favourite PubG matches
stored in MySQL. JWT Filter should be applied for all the API calls of the favourite service. JWT token should be used to authorize the user access to all the resources
- Writing Swagger Documentation
- Write Unit Test Cases and get it executed.
- Implement CI - continuous Integration ( use .gitlab-ci.yml)
- Dockerize the Favourite Service(create dockerfile and update the docker-compose.yml)


### Demonstrate the entire application
    1. Make sure all the functionalities are implemented
    2. Make sure both the UI (Component and Services) and server side (For all layers) codes are unit tested. 
    3. All the Services are up and running using docker (Dockercompose should be used for running them)
    4. E2E tests should be executed and shown
    5. Application is completely responsive in nature