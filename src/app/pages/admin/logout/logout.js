(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.logout')
      .controller('AlogoutCtrl', AlogoutCtrl);
  /** @ngInject */
  function AlogoutCtrl($scope, $state, Auth) {
    	
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


