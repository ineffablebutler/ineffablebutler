muniButlerApp.controller('HomeController', function($scope, User, $location) {

  // user object to store info related to this user
  // E.g., homeAddress, workAddress
  $scope.user = {};

  $scope.submit = function(){
    User.addRoute($scope.user.to,$scope.user.from);
    $location.path('/routes');
    // call factory function with user's home and work addresses
    // to get directions from Google Maps API  
  };

});