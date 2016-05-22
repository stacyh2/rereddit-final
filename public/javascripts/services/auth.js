app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

   auth.users=[];


   auth.saveToken = function (token) {
     $window.localStorage['rereddit-jwt'] = token;
   };

   auth.getToken = function (){
     return $window.localStorage['rereddit-jwt'];
   }

   auth.isLoggedIn = function(){
     var token = auth.getToken();

     if(token){
       var payload = JSON.parse($window.atob(token.split('.')[1]));

       return payload.exp > Date.now() / 1000;
     } else {
       return false;
     }
   };
   auth.getAll= function() {

      return $http.get('/users').then(function(data) {
        console.log("hey");
  
        angular.copy(data.data, auth.users);

        console.log(auth.users);
      });
    }

   auth.currentUser = function(){
     if(auth.isLoggedIn()){
       var token = auth.getToken();
       var payload = JSON.parse($window.atob(token.split('.')[1]));

       return payload;
     }
   };

   auth.register = function(user){
     return $http.post('/register', user).success(function(data){
       auth.saveToken(data.token);
     });
   };

   auth.logIn = function(user){
     return $http.post('/login', user).success(function(data){
       auth.saveToken(data.token);
     });
   };

   auth.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
   };

  return auth;
}]);