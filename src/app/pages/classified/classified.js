(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth')
      .controller('staycool', staycool);
  /** @ngInject */
  function staycool($scope, $state, Auth) {
    	
    	var vm = this;
    	
		   vm.signout = function(){				
			  Auth.$signOut().then(function (user){
			    console.log("user signed out");
			    $state.go('login');
			  }, function (error){
			    vm.error = error;
			  });
			};



  }

  	

})();


