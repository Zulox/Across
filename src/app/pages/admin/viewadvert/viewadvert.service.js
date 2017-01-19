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
            var userRef = new firebase.database().ref('users');           

            $firebaseArray(advertRef).$loaded().then(function (advertisements){

                    advertisements.forEach(function(adSnap, i) {   

                        var query =  userRef.orderByChild('advertisement/'+adSnap.$id).equalTo(true);
                        $firebaseArray(query).$loaded().then(function (owner){                         
                         advertisements[i] = extend({},  advertisements[i] , owner ) ;  
                                              
                      });
                  }); 
                     
               deferred.resolve(advertisements);    
            });
            return deferred.promise;
          }


          function getOwner(advertisements){  

          }


          function function3(){            
            
          }

          function extend(base) {
              var parts = Array.prototype.slice.call(arguments, 1);
              parts.forEach(function (p) {
                  if (p && typeof (p) === 'object') {
                      for (var k in p) {
                          if (p.hasOwnProperty(k)) {
                              base[k] = p[k];
                          }
                      }
                  }
              });
              return base;
          }

            return {
                  getAdvert     : getAdvert,   
                  getOwner      : getOwner,
                  extend        : extend,                
            };
         });  
})();