(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.dashboard')
      .controller('dashboardCtrl', dashboardCtrl);
  /** @ngInject */
  function dashboardCtrl( $scope, $state,toastr,AuthUser , $firebaseArray) {    	
		var vm = this;
		var currentUser = AuthUser.getConnecting();
		vm.TotalView;	
		vm.TotalClick;
		vm.Funds;
		vm.PublisherArray;

		vm.Alladpub;
		
		vm.getTotal = getTotal;
		
		getTotal();

		function getTotal(){

			console.log(currentUser);
			
			var userID = currentUser.$id;
			var AdsRef =  new firebase.database().ref("advertisement");			
			var totalview = 0;
			var totalclick = 0;
			var Funds = 0;


			var queryz = AdsRef.orderByChild('Owner/'+userID).equalTo(true);
			vm.AdsArray = $firebaseArray(queryz);

			

            vm.AdsArray.$loaded().then(function (advertisements){            	
              	vm.Funds = currentUser.funds;
              	advertisements.forEach(function(advertisement) { 
	            	totalclick 	+= advertisement.Totalclick;
	            	totalview 	+= advertisement.Totalview;
	            
	 
       		 	});

   		 	    vm.TotalView = totalclick ;	
				vm.TotalClick = totalview ;    		 	                        
            });	    
	               
        

		}
		
		

  }

  	

})();


