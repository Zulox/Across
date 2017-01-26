(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.user.viewadvert")
        .factory("viewadvertdetailFac", function( AuthUser, $q , $firebaseArray){
        	
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
            };
         });  
})();