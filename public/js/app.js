var muniButlerApp = angular.module('muniButler', ['ngMap', 'ngRoute', 'ngMaterial'])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/routes', {
      templateUrl: 'views/routes.html',
      controller: 'RoutesController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: ''
    })
    .otherwise({redirectTo: '/'});
    // Your code here
})

