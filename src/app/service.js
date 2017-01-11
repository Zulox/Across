(function() {
  "use strict";
    
    angular
        .module("BlurAdmin")
        .factory("Auth", function($firebaseAuth){
        	
        	console.log("Auth Called");
        	var auth = $firebaseAuth();

    		return auth;

            
        })

       


        ;
    
    
})();
