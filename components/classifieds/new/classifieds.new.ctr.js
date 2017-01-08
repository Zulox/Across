(function(){

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('newclassifiedsCtrl', function( $scope, $state , $mdDialog ,$timeout,$mdSidenav , facto){

			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;

			$timeout(function(){
				$mdSidenav('left').open();	
			});
			
			$scope.$watch('vm.sidenavOpen', function(sidenav){
				if(sidenav === false){
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');
						});
				}
			}); 

			 function closeSidebar(){
			 	vm.sidenavOpen = false;
			 }

			 function saveClassified(classified){
			 	if(classified){

		 			classified.contact = {
			    		name: "Zulox Malox",
			    		phone: "(012) 290 1141",
			    		email: "zulox93@gmail.com"
			    	}	
	 				$scope.$emit('newClassified', classified);
	 				vm.sidenavOpen = false; 
			 	}
			 	
			}

			 
		});
})();   