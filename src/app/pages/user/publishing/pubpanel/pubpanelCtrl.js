(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.publishing.pubpanel')
      .controller('pubpanelCtrl', pubpanelCtrl);
  /** @ngInject */
  function pubpanelCtrl( $scope, $state,toastr,AuthUser , $firebaseArray) {    	
		var vm = this;
		var currentUser = AuthUser.getConnecting();
		vm.PublisherArray;

		vm.Alladpub;
		
		vm.getTotal = getTotal;
		
		vm.UniqueSnippet;

		vm.publisher;

		getTotal();

		function getTotal(){

			
			var userID = currentUser.$id;
			var PublisherRef =  new firebase.database().ref("publisher");
			var AdpublisherRef =  new firebase.database().ref("adpublishing");


			var queryz = PublisherRef.orderByChild('Owner/'+userID).equalTo(true);
			vm.PublisherArray = $firebaseArray(queryz);

			var query2;
			var AdpublisherArray ;
			

            vm.PublisherArray.$loaded().then(function (publishers){            
            	
              	publishers.forEach(function(publisher) { 
				vm.UniqueSnippet = '<iframe height ="300px" width="300px" src="https://across-be2bb.firebaseapp.com/#/frame/' + publisher.$id + '"></iframe>';
	            	query2 =   AdpublisherRef.orderByChild('publisher/'+publisher.$id).equalTo(true);
	            	vm.publisher = publisher;
	            	AdpublisherArray  = $firebaseArray(query2);
	            	AdpublisherArray.$loaded().then(function (adpubs){
	            		vm.Alladpub = AdpublisherArray ;	            			            	            							            		              		          
		            	vm.PublisherArray.$save(publisher);

		            	console.log(vm.publisher);
           		 	});
       		 	                         
	            });	    
	               
            });

		}
		
		

  }

  	

})();


