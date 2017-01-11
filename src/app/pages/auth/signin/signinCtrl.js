(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.signin')
      .controller('AuthSigninCtrl', AuthSigninCtrl);
  /** @ngInject */
  function AuthSigninCtrl($scope, $state, Auth, AuthUser) {
    	console.log("Auth Controller ");
    	var vm = this;
    		// bower install --save angular
			/*
			Adding attribute to the controller
			vm.example;

			Adding function example
			vm.functionexample = functionexample;

			function functionexample(){
			 
			}
			*/
			vm.user;
			//vm.login = login;
			//vm.register = register;

			vm.user = {
		      email: '',
		      password: '',		 
		    };

		    vm.login = function(){
			  Auth.$signInWithEmailAndPassword(vm.user.email, vm.user.password).then(function (auth){

			  	var authData = Auth.$getAuth();

			  	var TempData = AuthUser.getProfile(authData.uid)

			  	TempData.$loaded().then(function () {		
					AuthUser.setConnecting(TempData);
					 $state.go('home');
				});	
			  }, function (error){
			    vm.error = error;
			  });
			};
  }

  	

})();


