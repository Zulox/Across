(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.addadvert')
      .controller('addadvertCtrl', addadvertCtrl);
  /** @ngInject */
  function addadvertCtrl($scope, $state, AuthUser, $firebaseArray,  $uibModal, toastr) {    	
    		var vm = this;
    	
		
		
			vm.advertisement;
			vm.open = open;
			vm.Addads =  vm.Addads;


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
				     	Basevalue: vm.advertisement.basevalue,
				    	LandingURL: vm.advertisement.landingURL,
				    	BannerURL : vm.advertisement.banner,
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
				  rootpath.child("/advertisement/"+id+"/Owner/fullname").set(currentUser.fullname);							  
				  toastr.success('Advertisement added and awaiting admin approval');
				   $state.go('user.viewadvert');
				});
				
		    }


			function open(page) {

				//add validation in here

		      $uibModal.open({
		        animation: true,
		        templateUrl: page,	
		        controller: 'addadvertCtrl' ,
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


