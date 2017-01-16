(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.viewadvert")
        .factory("viewadvertFac", function( AuthUser, $q , $firebaseArray){
        	
           var vm = this;

           vm.rootpath  = new firebase.database().ref();
           
           
          function getAdvert(){
             var deferred = $q.defer();


             var advertRef = new firebase.database().ref('advertisement');

             var currentUser = AuthUser.getConnecting();
             var userID  = currentUser.$id;
             // userID = 'mkPtVM3quATFzX5lYnbpj42CdPu1';
  
             /*advertRef.orderByChild('Owner/'+userID).equalTo(true).on('value', function(snap) {                
                deferred.resolve(snap.val());
            });*/
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
                  getAdvert     : getAdvert,   
                  function2     : function2,
                  function3     : function3                
            };
         });  
})();