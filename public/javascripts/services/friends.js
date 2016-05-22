

app.factory('friends', ['$http', function($http) {
  var userService = {
    users: [],

    getAll: function() {
      return $http.get('/users').then(function(data) {
  
        angular.copy(data.data, userService.users);
      });
    }

  
};
  return userService;
}]);
