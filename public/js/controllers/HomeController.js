muniButlerApp.controller('HomeController', function ($scope, $location, User, Autocomplete, GoogleMaps) {
  // controller for the home page
  // author: Albert Tang

  // grab any saved route information from the User factory
  $scope.routes = User.routes;

  // does the user want to add a new route?
  $scope.addnewroute = false;
  // button text
  $scope.msg = "Add new route!";
  $scope.msgChange = function () {
    if ($scope.addnewroute) $scope.msg = "Cancel";
    else $scope.msg = "Add new route!";
  };

  // object for temporary user information
  $scope.user = {
    from: "Finding current location..."
  };

  // has the autocomplete updated the input values?
  $scope.enter = false;
  // submit function
  $scope.submit = function (validation) {
    if (!validation) return;
    // update User information in the User factory
    User.trip = {
      to: $scope.user.to,
      from: $scope.user.from
    };
    // the RoutesController at /routes will handle this information
    $location.path('/routes');
  };

  // change latitude/longitude into actual addresses and update the from address
  function success(position) {
    var pos;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({
      'location': latlng
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        pos = results[0].formatted_address;
        $scope.user.from = pos;
        $scope.$apply();
      }
    });
    $scope.setMap(latlng);
  }

  function error() {
    $scope.setMap(new google.maps.LatLng(37.7837235, -122.4089778));
    throw new Error("Geolocation failed.")
  }

  // use the GoogleMaps factory to update the map
  $scope.setMap = function (location) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 18,
      center: location
    };
    var map = new google.maps.Map(document.getElementById('routes-map'), mapOptions);
    directionsDisplay.setMap(map);
  };

  // =================================
  //   FUNCTIONS THAT RUN ON LOAD
  // =================================

  // use the Autocomplete factory to set up autocomplete
  Autocomplete.initialize($scope);

  // use HTML5 to find the current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

});