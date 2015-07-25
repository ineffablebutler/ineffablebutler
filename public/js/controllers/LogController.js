muniButlerApp.controller('LogController', function ($scope, Auth, User) {
  // controller for the index page
  // author: Albert Tang

  // is the user logged in?
  $scope.loggedin = false;

  // array to store the possible log in options
  $scope.options = [];

  // use the Auth factory to check if the user is logged in
  $scope.logincheck = function () {
    Auth.check()
      // if yes, update the User information in the User factory
      .then(function (resp) {
        $scope.loggedin = true;
        User.displayName = resp.data.displayName;
        User.id = resp.data.id;
        User.routes = resp.data.routes;
        return;
      })
      // if no, fill in the possible log in options
      .catch(function (err) {
        $scope.options = err.data.authMethods;
        return;
      });
  };

  // use the Auth factory to log out
  $scope.logout = function () {
    Auth.logout()
      .then(function (resp) {
        $scope.loggedin = false;
        return $scope.logincheck();
      })
      .catch(function (err) {
        throw new Error(err);
        return;
      });
  };

  // =================================
  //   FUNCTIONS THAT RUN ON LOAD
  // =================================
  $scope.logincheck();

});