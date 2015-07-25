/*
 ** RoutesController.js
 ** Logic used for displaying a user's route options and handling selections.
 ** 
 ** Authors: Danielle Knudson, Albert Tang
 */

muniButlerApp.controller('RoutesController', function ($scope, $location, $timeout, User, GoogleMaps, Bus) {
  
  /**************
   ** VARIABLES **
   ***************/
  
  $scope.model = {
    trip: User.trip,
    routeHeading: 'Select Route',
    routeOptions: [],
    route: {
      from: User.trip.from,
      to: User.trip.to,
      route: ''
    }
  };

  /**************
   ** FUNCTIONS **
   ***************/

  // Handles a route selection (click event) on routes.html
  // Will save the departure/return route for the user
  // Redirects to home.html
  $scope.model.selectRoute = function (route) {
    var busNumber = route.lines[0][0];
    var stopName = route.lines[0][1];
    var duration = route.duration;
    var arrivalTimes = route.arrivalTimes;

    // $scope.model.routeHeading = "Departure Route";
    $scope.model.route.route = [busNumber, stopName, duration, arrivalTimes];
    User.addRoute($scope.model.route);

    GoogleMaps.getRouteOptions(User.trip['to'], User.trip['from']).then(function (routes) {
      $scope.model.routeOptions = routes;
      Bus.getBusesArrivalTimes(routes); 
    }, function (error) {
      throw new Error("Failed: " + error)
    });
    $location.path('/');
     
  };

  /**************
   **** LOGIC ****
   ***************/

  // If the user hasn't entered a departure or destination route,
  // the user should be redirected to the home page 
  if (!$scope.model.route.to || !$scope.model.route.from) {
    $location.path('/');
  }
  // If the user has departure and destinate addresses, get the route
  // options for the departure route
  
  GoogleMaps.getRouteOptions(User.trip.from, User.trip.to).then(function (routes) {
    $scope.model.routeOptions = routes;
    Bus.getBusesArrivalTimes(routes); 
  }, function (error) {
    throw new Error("Failed: " + error)
  });
  // Update the bus arrival times every second
}); //end of RoutesController

