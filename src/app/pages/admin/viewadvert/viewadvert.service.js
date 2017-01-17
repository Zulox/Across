(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.admin.viewadvert")
        .factory("aviewadvertFac", function( AuthUser, $q , $firebaseArray){
        	
           var vm = this;

           vm.rootpath  = new firebase.database().ref();
           
           
          function getAdvert(){
            var deferred = $q.defer();


            var advertRef = new firebase.database().ref('advertisement');
    
            $firebaseArray(advertRef).$loaded().then(function (advertisements){
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