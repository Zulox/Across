(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.publishing.pubpanel')
      .controller('pubpanelCtrl', pubpanelCtrl);
  /** @ngInject */
  function pubpanelCtrl( $scope, $state,toastr,AuthUser , $firebaseArray) {    	
		var vm = this;
		var currentUser = AuthUser.getConnecting();
		vm.TotalView;	
		vm.TotalClick;
		vm.TotalRevenue;
		vm.PublisherArray;

		vm.Alladpub;

		vm.yolo = "vm is working";
		
		vm.getTotal = getTotal;
		
		vm.UniqueSnippet;

		getTotal();

		function getTotal(){

			
			var userID = currentUser.$id;
			var PublisherRef =  new firebase.database().ref("publisher");
			var AdpublisherRef =  new firebase.database().ref("adpublishing");
			var totalview = 0;
			var totalclick = 0;
			var totalrevenue = 0;


			var queryz = PublisherRef.orderByChild('Owner/'+userID).equalTo(true);
			vm.PublisherArray = $firebaseArray(queryz);

			var query2;
			var AdpublisherArray ;
			

            vm.PublisherArray.$loaded().then(function (publishers){
            	console.log(publishers);
            	
              	publishers.forEach(function(publisher) { 
				vm.UniqueSnippet = '<iframe height ="300px" width="300px" src="https://across-be2bb.firebaseapp.com/#/frame/' + publisher.$id + '"></iframe>';
	            	query2 =   AdpublisherRef.orderByChild('publisher/'+publisher.$id).equalTo(true);

	            	AdpublisherArray  = $firebaseArray(query2);
	            	AdpublisherArray.$loaded().then(function (adpubs){
	            		vm.Alladpub = AdpublisherArray ;
	            		console.log(vm.Alladpub);
	            		adpubs.forEach(function(adpub) { 	 
	            		     			            	
	            			totalview = totalview + adpub.view;
							totalclick = totalclick + adpub.click; 
							totalrevenue = totalrevenue + adpub.revenue;  
							          			         		
	            		});
	            		            		            
					publisher.Totalview =  totalview;
					publisher.Totalclick =  totalclick;
		            publisher.Totalrevenue  =   totalrevenue;
		            publisher.Totalrevenue = Math.round(publisher.Totalrevenue * 100) / 100;
		            console.log(publisher.Totalrevenue);
		            
		              		          
	            	vm.PublisherArray.$save(publisher);

	            	vm.TotalView = publisher.Totalview;
	            	vm.TotalClick = publisher.Totalclick;
	            	vm.TotalRevenue = publisher.Totalrevenue;


           		 	});
       		 	                         
	            });	    
	               
            });

		}
		
		

  }

  	

})();


