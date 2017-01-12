(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
      .controller('homeCtrl', homeCtrl);
  /** @ngInject */
  function homeCtrl($scope, $state, AuthUser, $firebaseArray,  $uibModal, toastr) {    	
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
			vm.advertisement;
			vm.open = open;
			vm.Addads =  vm.Addads;
			//vm.register = register;



			vm.user = {
		      email: '',
		      password: '',		 
		    };


		    function Addads(){
		    	
		    	vm.error = '';	

		    	//Get current Date
		    	var date = new Date();
				var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
				

				//Get loggined in user ID
		    	var currentUser = AuthUser.getConnecting();
		    	vm.userID = currentUser.$id;


		    	//Root path		    	
		    	var rootpath  = new firebase.database().ref();

		    	//Advertisement  path
				var ref = new firebase.database().ref('advertisement');
    			var advertisements = $firebaseArray(ref);

    			advertisements
    				.$add({  
    					Name: vm.advertisement.name,
				     	Keyword: vm.advertisement.keyword,
				    	LandingURL: vm.advertisement.landingURL,
				    	BannerURL : "URL",
				    	Budget : vm.advertisement.budget,
				    	Remainbudget : vm.advertisement.budget,
				    	Status : "Pending",
				    	Totalview : 0,
				    	Totalclick : 0,
				    	CreatedAt : FromDate,
				    	LastEdit  : FromDate,
				    	AdsPublishing : "",
    				})
    				.then(function(pogback) {
				  var id = pogback.key;
				  rootpath.child("/users/"+ vm.userID+"/advertisement/" + id).set(true);
				  rootpath.child("/advertisement/"+id+"/Owner/" + vm.userID).set(true);				  
				  toastr.success('Advertisement added and awaiting admin approval');
				});

		    }


			function open(page) {


		      $uibModal.open({
		        animation: true,
		        templateUrl: page,	
		        controller: 'homeCtrl' ,
		        controllerAs: 'vm',	        
		        resolve: {
		          items: function () {
		          	console.log('uibmodal');
		            return $scope.items;
		          }
		        }
		      }).closed.then(function(){
		 		 Addads();
				});
		    }

		  
  }

  	

})();


