(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.user.viewadvert")
        .factory("viewadvertFac", function( AuthUser, $q , $firebaseArray){
        	
           var vm = this;

           vm.rootpath  = new firebase.database().ref();
           
           
          function getAdverts(){
            var deferred = $q.defer();


            var advertRef = new firebase.database().ref('advertisement');

            var currentUser = AuthUser.getConnecting();
         
            var userID  = currentUser.$id;
           
            var queryz = advertRef.orderByChild('Owner/'+userID).equalTo(true);
            $firebaseArray(queryz).$loaded().then(function (advertisements){
              deferred.resolve(advertisements);
            });



             return deferred.promise;
          }


          function function2(){                         
          }


          function function3(){            
            
          }

            return {
                  getAdverts     : getAdverts,   
                  function2     : function2,
                  function3     : function3                
            };
         });  
})();