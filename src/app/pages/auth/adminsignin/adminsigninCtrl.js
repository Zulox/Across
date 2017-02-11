(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.adminsignin')
      .controller('AdminsigninCtrl', AdminsigninCtrl);
  /** @ngInject */
  function AdminsigninCtrl($scope, $state, Auth, AuthUser, toastr) {
    		console.log("Admin Controller ");
    		var vm = this;
    		
			vm.admin;
		

			vm.admin = {
		      email: '',
		      password: '',		 
		    };

		    vm.login = function(){
			  Auth.$signInWithEmailAndPassword(vm.admin.email, vm.admin.password).then(function (auth){

			  	var authData = Auth.$getAuth();

			  	var TempData = AuthUser.getProfile(authData.uid)

			  	TempData.$loaded().then(function () {		
					AuthUser.setConnecting(TempData);
					 $state.go('admin.viewadvert');
					 toastr.success('Admin Login');
				});	
			  }, function (error){
			    vm.error = error;
			  });
			};
  }

  	

})();


