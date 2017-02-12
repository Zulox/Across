(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.dashboard')
      .controller('dashboardCtrl', dashboardCtrl);
  /** @ngInject */
  function dashboardCtrl( $scope, $state,toastr,AuthUser , $firebaseArray) {    	
		var vm = this;
		vm.currentUser = AuthUser.getConnecting();
		vm.TotalView;	
		vm.TotalClick;
		vm.Funds;
		vm.PublisherArray;
		vm.addfund = false;

		vm.Alladpub;
		
		vm.getTotal = getTotal;

		vm.increaseFund = increaseFund;
		
		getTotal();

		function getTotal(){

		
			
			var userID = vm.currentUser.$id;
			var AdsRef =  new firebase.database().ref("advertisement");			
			var totalview = 0;
			var totalclick = 0;
			var Funds = 0;


			var queryz = AdsRef.orderByChild('Owner/'+userID).equalTo(true);
			vm.AdsArray = $firebaseArray(queryz);

			

            vm.AdsArray.$loaded().then(function (advertisements){            	
              
              	advertisements.forEach(function(advertisement) { 
	            	totalclick 	+= advertisement.Totalclick;
	            	totalview 	+= advertisement.Totalview;
	            
	 
       		 	});

   		 	    vm.TotalView = totalclick ;	
				vm.TotalClick = totalview ;    		 	                        
            });	    
	               
        

		}


		function increaseFund(){
		var rootRef = new firebase.database().ref();
		rootRef.child("/users/"+ vm.currentUser.$id +"/funds").set(vm.currentUser.funds + vm.Funds); 
		  toastr.success('Funds Increased');
		}
		
		

  }

  	

})();


