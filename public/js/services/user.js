muniButlerApp.factory('User', function(){
  var user = {};

  user.username = '';
  user.firstName = '';
  user.loginMethod = '';

  // user.routes is an array of objects
  // each object contains two addresses and two options
  // {
  //   to: '944 Market St',
  //   from: '13333 Candy Lane',
  //   routeTo: '38',
  //   routeFrom: '38'
  // }
  user.routes = [];

  user.addRoute = function(to, from, routeTo, routeFrom){
    var route = {
      id: user.routes.length, 
      to: to,
      from: from,
      routeTo: routeTo,
      routeFrom: routeFrom
    };

    user.routes.push(route);
    console.log(route);
    return route;
  };

  user.removeRoute = function(id){
    var removed = user.routes.splice(id, 1);
    return removed;
  };

  return user;
});


