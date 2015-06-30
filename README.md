# MuniButler

> 

Fast, reliable MUNI times for your commute to work and home.

## Team

  - __Product Owner__: Dani Knudson
  - __Scrum Master__: Albert Tang
  - __Development Team Members__: Albert Tang, Dani Knudson, Eric Kao, François Romain

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [External APIs](#external-apis)
    1. [Deployment](#deployment)
    1. [Product Roadmap](#product-roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 0.10.x
- MongoDB 3.0.6x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Local Development

Setting up MongoDB database (for creating Users and adding Routes):
- From within root folder of the project, start MongoDB: mongod
- Run 'mongo'

Populating Database with 511 Routes and Stop Codes
- In worker file run 'node 511xmlfetcher.js' to populate DB with stop codes/routes

## External APIs

- Google Maps API: [https://developers.google.com/maps/documentation/javascript/?hl=de](https://developers.google.com/maps/documentation/javascript/?hl=de)
- 511 API: [http://www.511.org/developer-resources_transit-api.asp](http://www.511.org/developer-resources_transit-api.asp)


### Deployment
- grunt default:
    - Concatenates, css minifies, and uglifies, accounting for variable names in Angular.
- grunt deploy:
    - Replaces text in config/googleConfig as production and deployment keys should be different.
    - Replaces HTML in public/index.html as production and deployment file references should be different.
- Both the server (app.js) and the database server (config/db.js) utilize the global variable process.env
- The Procfile is used for Heroku deployment.

### Product Roadmap

View the project roadmap [here](https://github.com/ineffablebutler/ineffablebutler/issues)

MuniButler is currently an MVP.

We need your help to build out its feature set!

***Product Roadmap***
- Keep user logged in based on a 'remember me' cookie
    - Allows a user to refresh the page without having to log in again
- Allow user to view full direction steps on home.html and routes.html
- Implement loading UI's to create a better user experience and set user expectations
    - https://material.angularjs.org/latest/#/demo/material.components.progressCircular
- Allow a user to delete a route
- Allow a user to create a custom name for their routes, e.g., "Routes to Work," "Routes Home," etc.
- Allow the user to share their routes with family and friends
- Allow users to befriend others
- Create a schedule feature which allows users to see their routes at specific times, e.g., M-F ~8 AM a user can see their favorite route to work.
- Use http://ionicframework.com/ to create a better mobile experience


## Contributing

See [CONTRIBUTING.md](https://github.com/ineffablebutler/ineffablebutler/master/contributing.md) for contribution guidelines.
