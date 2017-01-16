(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth')
      .controller('AuthSignupCtrl', AuthSignupCtrl);
  /** @ngInject */
  function AuthSignupCtrl($scope, $state, Auth) {
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
		      fullname: '',
		      contact: '',

		    };

		    vm.login = function(){
			  Auth.$signInWithEmailAndPassword(vm.user).then(function (auth){
			    console.log("Logged in!! nicely Done")
			  }, function (error){
			    vm.error = error;
			  });
			};

			vm.register = function(){
				vm.error = '';				
			    Auth.$createUserWithEmailAndPassword(vm.user.email, vm.user.password).then(function (user){			    
			   			   
			    var authData = Auth.$getAuth();
			    if (authData) {				  
				  				  
				  firebase.database().ref('users/' + authData.uid).set({				    
				    email: vm.user.email,
				    fullname: vm.user.fullname,
				    contact : vm.user.contact,
				    funds : 0,
				    level : "USER",
				  });
				  $state.go('user.dashboard');
				  console.log("Done");
				} else {
				  console.log("Logged out");
				}
				


			  }, function (error){
			    vm.error = error;
			  });
			};

			vm.signout = function(){
				console.log(vm.user.email)
			  Auth.signOut().then(function (user){
			    console.log("user signed out")
			  }, function (error){
			    vm.error = error;
			  });
			};


  }

  	

})();


