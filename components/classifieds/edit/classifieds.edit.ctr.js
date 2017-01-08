(function(){

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('editclassifiedsCtrl', function( $scope, $state , $mdDialog ,$timeout,$mdSidenav , facto){

			var vm = this;
			vm.classifieds = facto.ref;
			vm.closeSidebar = closeSidebar;
			vm.saveEdit = saveEdit;
			vm.classified = vm.classifieds.$getRecord($state.params.id);

			// console.log(vm.classified);

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
 
			 function saveEdit(){
			 	vm.classifieds.$save(vm.classified).then(function(){
			 		$scope.$emit('editSaved', 'Edit is saved' );
			 		vm.sidenavOpen = false;
			 	});
			 	
			}

			 
		});
})();   