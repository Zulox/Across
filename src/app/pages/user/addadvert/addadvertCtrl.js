(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.addadvert')
      .controller('addadvertCtrl', addadvertCtrl);
    
  /** @ngInject */
  function addadvertCtrl($scope, $state, AuthUser, $firebaseArray,  $uibModal, toastr, Upload) {    	
    		var vm = this;
    		 
		
		
			vm.advertisement;
			vm.open = open;
			vm.Addads =  vm.Addads;
			vm.imagesTest = imagesTest;
			vm.imgchange = imgchange;
			vm.budgetchange = budgetchange;
			vm.validation = {};
		
			vm.currentUser = AuthUser.getConnecting();

		    function Addads(){
		 	
		    	vm.error = '';	

		    	//Get current Date
		    	var date = new Date();
				var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
				

				//Get loggined in user ID
		    	
		    	vm.userID = vm.currentUser.$id;


		    	//Root path		    	
		    	var rootpath  = new firebase.database().ref();
		    	
		    	//Advertisement  path
				var ref = new firebase.database().ref('advertisement');
    			var advertisements = $firebaseArray(ref);
    		
    			console.log(vm.advertisement);
    			advertisements
    				.$add({  
    					Name: vm.advertisement.name,
				     	Basevalue: vm.advertisement.basevalue,
				    	LandingURL: vm.advertisement.landingURL,
				    	BannerURL : " ",
				    	Budget : vm.advertisement.budget,				    	
				    	Status : "Pending",
				    	Totalview : 0,
				    	Totalclick : 0,
				    	CreatedAt : FromDate,
				    	LastEdit  : FromDate,
				    	AdsPublishing : " ",
    				})
    				.then(function(pogback) {
    			  console.log(pogback);
				  var id = pogback.key;
				  rootpath.child("/users/"+ vm.userID+"/advertisement/" + id).set(true);
				  rootpath.child("/advertisement/"+id+"/Owner/" + vm.userID).set(true);
				  rootpath.child("/advertisement/"+id+"/Owner/fullname").set(vm.currentUser.fullname);				
				  imagesTest(id, rootpath);			  
				  
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
		 		 console.log("hi");
		 		 Addads();
				});
		    }

		    function imagesTest(targetname, rootpath){

		    	var storageRef = firebase.storage().ref();

		    	 var metadata = {
			        'contentType': vm.picFile.type
			     };


		    	console.log(vm.picFile);  

		    	storageRef.child('asset/img/advertisement/' + targetname).put(vm.picFile, metadata).then(function(snapshot) {
		       
		        var url = snapshot.downloadURL;
		        console.log('File available at', url);
		   		 rootpath.child("/advertisement/"+targetname+"/BannerURL").set(url).then(function (){
		   		 	console.log("added");
		   		 	toastr.success('Advertisement added and awaiting admin approval');
				    $state.go('user.viewadvert');
		   		 });	
		      }).catch(function(error) {
		      
		        console.error('Upload failed:', error);
		     	
		      });


		    }

		    function imgchange(){
		    	var currentUser = AuthUser.getConnecting();
		    	
				var ext = vm.picFile.name.match(/\.(.+)$/)[1];
		    	console.log(ext);
		    	console.log(vm.currentUser);
		    	if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
		             console.log("valid");
		         
		             vm.validation.img = true;

		       }  
		       else{
		       		console.log("not valid");
		       		 vm.validation.img = false;
		      
		       }      
		       console.log(vm.validation);
		    }

		    function budgetchange(){
		    	console.log(vm.advertisement.budget);
		    	console.log(vm.currentUser.funds);
		    	if(vm.advertisement.budget > vm.currentUser.funds){
		    		vm.validation.budget = false;
		    	}
		    	else{
					vm.validation.budget = true;	    	
		    	}
		    	console.log(vm.validation);

		    }



		    

		  
  }


  	

})();


