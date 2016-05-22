app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth){

auth.getAll();
$scope.users = auth.users;



    


  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);