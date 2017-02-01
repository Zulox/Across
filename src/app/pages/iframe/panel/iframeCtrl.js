(function () {
  'use strict';

  angular.module('BlurAdmin.pages.iframe.panel')
      .controller('iframeCtrl', iframeCtrl);
  /** @ngInject */
  function iframeCtrl($scope, $state, Auth, AuthUser, $firebaseArray) {
    	console.log("Controller engage ");
    	var vm = this;



    	//$state.params.id

    	vm.adsClick = adsClick;

    	vm.adpubRef = new firebase.database().ref('adpublishing');
    	vm.adRef = new firebase.database().ref('advertisement');
    	
	    var query = vm.adpubRef.orderByChild('publisher/'+$state.params.id).equalTo(true);
	    
	    vm.adpubArray = $firebaseArray(query);
	    vm.adArray;

	    vm.adpubArray.$loaded().then(function (){
	    	//Random adds engage	
	    	vm.randomAds = vm.adpubArray[Math.floor(Math.random() * vm.adpubArray.length)];
			
	    	   
	    	 var query2 = vm.adRef.orderByChild('AdsPublishing/'+vm.randomAds.$id).equalTo(true);
	    	 	    	
	    	 vm.adArray = $firebaseArray(query2);
	    	 vm.adArray.$loaded().then(function (ads){

	    	 		vm.selad = ads[0];

	    	 		vm.selad.Totalview++;
	    	 		vm.selad.Remainbudget -= 0.10;
	    	 		vm.selad.Remainbudget =  Math.round( vm.selad.Remainbudget * 100) / 100;

	    	 	 	vm.randomAds.view++;
	    	        vm.randomAds.revenue += 0.10;
	    	         vm.randomAds.revenue =  Math.round( vm.randomAds.revenue * 100) / 100;
	    	        

	    	        console.log(vm.selad);
	    	        console.log(vm.randomAds);

	    	        vm.adArray.$save(vm.selad);
	    	 		vm.adpubArray.$save(vm.randomAds);
	    	 });
			

	    	 
	    	
	   

	    	 

	    	

	    });


	    function adsClick(){
	    	vm.selad.Totalclick++;
	    	vm.selad.Remainbudget -= 0.50;
	    	vm.selad.Remainbudget =  Math.round( vm.selad.Remainbudget * 100) / 100;

	    	vm.randomAds.click++;
	        vm.randomAds.revenue += 0.50;
	        vm.randomAds.revenue =  Math.round( vm.randomAds.revenue * 100) / 100;
	        

	        vm.adArray.$save(vm.selad);
	    	vm.adpubArray.$save(vm.randomAds);


	    	console.log("binggo bonggo");
	        console.log(vm.selad);
	        console.log(vm.randomAds);

	         window.location.assign(vm.randomAds.advertisement.LandingURL);
	    }

    	
    	
  }

  	

})();


