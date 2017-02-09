(function () {
  'use strict';

  angular.module('BlurAdmin.pages.iframe.panel')
      .controller('iframeCtrl', iframeCtrl);
  /** @ngInject */
  function iframeCtrl($scope, $state, Auth, AuthUser, $firebaseArray, $filter) {
    	console.log("Controller engage ");
    	var vm = this;



    	//$state.params.id

    	vm.adsClick = adsClick;

    	vm.rootRef = new firebase.database().ref();
    	vm.adpubRef = new firebase.database().ref('adpublishing');
    	vm.adRef = new firebase.database().ref('advertisement');
    	vm.pubRef = new firebase.database().ref('publisher');

    	var query3 = vm.pubRef.orderByChild($state.params.id);
    	vm.pubArray = $firebaseArray(query3);

    	vm.pubArray.$loaded().then(function(){

    		console.log(vm.pubArray[0]);
    	});



    	
	    var query = vm.adpubRef.orderByChild('publisher/'+$state.params.id).equalTo(true);
	    
	    vm.adpubArray = $firebaseArray(query);
	    vm.adArray;


	    vm.adpubArray.$loaded().then(function (){
	    	
	    	//sort array by Basevalue ,  higher basevalue first
	    	vm.filteredArray = $filter('orderBy')(vm.adpubArray, "-advertisement.Basevalue")
	    	
	    	//sort Array only show array that are active / have budget
	    	vm.filteredArray = vm.filteredArray.filter(function (adpub) {
			    return (adpub.advertisement.Status == "Active");
			});
		    		    	    
	    	vm.selectedAds = getRandomWeightedElement( vm.filteredArray); 


	    	var query2 = vm.adRef.orderByChild('AdsPublishing/'+vm.selectedAds.$id).equalTo(true);

	    	vm.adArray = $firebaseArray(query2);

	    	vm.adArray.$loaded().then(function (ads){

	    	 		vm.selad = ads[0];

	    	 		vm.selad.Totalview++;
	    	 		vm.selad.Budget -= vm.selad.Basevalue;
	    	 		vm.selad.Budget =  Math.round( vm.selad.Budget * 100) / 100;

	    	 	 	vm.selectedAds.view++;
	    	        vm.selectedAds.revenue +=  vm.selad.Basevalue;
	    	        vm.selectedAds.revenue =  Math.round( vm.selectedAds.revenue * 100) / 100;

	    	        vm.pubArray[0].Totalview++;
	    	        vm.pubArray[0].Totalrevenue +=  vm.selad.Basevalue;
	    	        vm.pubArray[0].Totalrevenue = Math.round(  vm.pubArray[0].Totalrevenue * 100) / 100;
	    			
	    	        vm.adpubArray.$save(vm.selectedAds);
	    	 	    vm.pubArray.$save(vm.pubArray[0]);
	    	 	    
	    			
	    			
	    			//Atomic update
	    			if( vm.selad.Budget <= 0){
	    				console.log(vm.selad.Budget);
	    				var adpubkey = Object.keys(vm.selad.AdsPublishing);
	    				var updateObj = {};
            			
			            adpubkey.forEach(function (key){
			                updateObj['adpublishing/'+key+ '/advertisement/Status'] =  "Inactive";			              		
			            });

			            vm.selad.Status = "Inactive";

				        vm.rootRef.update(updateObj)
			            .then( function (){
			              console.log("mushi mushi");
			            })
			            .catch( function (){
			              console.log("no mushi");
			            })
			            ;   
	    			}
	    	        
	    	         vm.adArray.$save(vm.selad);
	    	 	   
	    	});





	    });

	    function sumof(items){
			    var total = 0;
			    items.forEach(function(item){ 
			    	total += item.advertisement.Basevalue;
			    });
			    return total;
		};



	     function getRandomWeightedElement( filArray) {
	     	var maxnum = sumof(filArray);
	     	
	     	//might need better randomizer
	     	var randomSeed = Math.floor(Math.random() * (maxnum - 1) + 1);
	     	console.log("randomSeed Value :  " + randomSeed)

	     	for(var i = 0 ; i < filArray.length ; i++){ 
			    	randomSeed -= filArray[i].advertisement.Basevalue;
			    	console.log("Rand : " + randomSeed + "      BaseVal :" + filArray[i].advertisement.Basevalue)
			    	if (randomSeed  <= 0){	
			    		console.log(filArray[i]);		    		
			    		return filArray[i];
			    	}
		    };		   
  		}		


	    function adsClick(){
	        vm.selad.Totalclick++;	    
	 		vm.selad.Budget -= (vm.selad.Basevalue * 5);
	 		vm.selad.Budget =  Math.round( vm.selad.Budget * 100) / 100;

	 	 	vm.selectedAds.click++;
	        vm.selectedAds.revenue +=  (vm.selad.Basevalue * 5);
	        vm.selectedAds.revenue =  Math.round( vm.selectedAds.revenue * 100) / 100;

	        vm.pubArray[0].Totalclick++;
	        vm.pubArray[0].Totalrevenue +=  (vm.selad.Basevalue * 5);
	        vm.pubArray[0].Totalrevenue = Math.round(  vm.pubArray[0].Totalrevenue * 100) / 100;
	        
	        vm.adpubArray.$save(vm.selectedAds);
	    	vm.pubArray.$save(vm.pubArray[0]);
	    	

	        //Atomic update
	        if( vm.selad.Budget <= 0){
	        	console.log(vm.selad.Budget);
	    				var adpubkey = Object.keys(vm.selad.AdsPublishing);
	    				var updateObj = {};
            
			            adpubkey.forEach(function (key){
			                updateObj['adpublishing/'+key+ '/advertisement/Status'] =  "Inactive";			              		
			            });

			            vm.selad.Status = "Inactive";

				        vm.rootRef.update(updateObj)
			            .then( function (){
			              console.log("mushi mushi");
			            })
			            .catch( function (){
			              console.log("no mushi");
			            })
			            ;

			}

			vm.adArray.$save(vm.selad);
	        
	    	

	        window.location.assign(vm.selectedAds.advertisement.LandingURL);
	    }

    	
    	
  }

  	

})();


