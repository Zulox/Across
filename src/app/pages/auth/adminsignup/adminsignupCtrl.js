(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.adminsignup')
      .controller('AdminsignupCtrl', AdminsignupCtrl);
  /** @ngInject */
  function AdminsignupCtrl($scope, $state, Auth) {
    	console.log("Admin Create");
    	var vm = this;
    	
			vm.admin;
			
			vm.admin = {
		      email: '',
		      password: '',
		      fullname: '',
		      contact: '',

		    };

			vm.register = function(){
				vm.error = '';				
			    Auth.$createUserWithEmailAndPassword(vm.admin.email, vm.admin.password).then(function (user){			    
			   			   
			    var authData = Auth.$getAuth();
			    if (authData) {				  
				  				  
				  firebase.database().ref('users/' + authData.uid).set({				    
				    email: vm.admin.email,
				    fullname: vm.admin.fullname,
				    contact : vm.admin.contact,
				    funds : 0,
				    level : "ADMIN",
				  });
				  $state.go('admin.dashboard');
				 
				} else {
				 
				}
				


			  }, function (error){
			    vm.error = error;
			  });
			};		
  }

  	

})();


