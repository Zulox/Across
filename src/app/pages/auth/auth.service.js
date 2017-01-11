(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.auth")
        .factory("AuthMain", function($firebaseAuth){
        	
        	console.log("Auth Called");
        	var auth = $firebaseAuth();

    		return auth;

            
        })

        .factory('AuthUser', function($firebaseArray, $firebaseObject){
            var usersRef = firebase.database().ref('users');
            var users = $firebaseArray(usersRef);
            var userinfo = '';

            var Users = {
              getProfile: function(uid){
                return $firebaseObject(usersRef.child(uid));
              },
              setConnecting: function(data){
               userinfo = data;              
              },
              getConnecting: function(data){
               return userinfo;              
              },
              getDisplayName: function(uid){
                return users.$getRecord(uid).displayName;
              },
              all: users
            };

            return Users;
        })
        ;
    
    
})();