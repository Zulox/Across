(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.addadvert')
      .controller('addadvertCtrl', addadvertCtrl);
    
  /** @ngInject */
  function addadvertCtrl($scope, $state, AuthUser, $firebaseArray,  $uibModal, toastr, Upload) {    	
    		var vm = this;
    		 
		
						
			vm.advertisement;
			vm.open = open;
			vm.Addads =  Addads;
			vm.imagesTest = imagesTest;
			
			vm.validation = {
				'all' : false,
				'img' : false,
				'value' : false,
				'budget' : false,
				'name' : false,
				'url' : false, 
			};



			//validation function			
			vm.budgetchange = budgetchange;
			vm.imgchange = imgchange;
			
			vm.landingchange = landingchange;
			vm.namechange = namechange;
			vm.validcheck = validcheck;
			
		
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
				    	BannerURL : "",
				    	Budget : vm.advertisement.budget,				    	
				    	Status : "Pending",
				    	Totalview : 0,
				    	Totalclick : 0,
				    	CreatedAt : FromDate,
				    	LastEdit  : FromDate,
				    	AdsPublishing : "",
    				})
    				.then(function(pogback) {
    			  console.log(pogback);
				  var id = pogback.key;
				  rootpath.child("/users/"+ vm.userID+"/advertisement/" + id).set(true);
				  rootpath.child("/users/"+ vm.userID+"/funds").set(vm.currentUser.funds - vm.advertisement.budget);
				  rootpath.child("/advertisement/"+id+"/Owner/" + vm.userID).set(true);
				  rootpath.child("/advertisement/"+id+"/Owner/fullname").set(vm.currentUser.fullname);				
				  imagesTest(id, rootpath);			  
				  
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
		    if(vm.picFile){	
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
		   }     
		       validcheck();
		    }

		    function budgetchange(){
		    	console.log(vm.currentUser.funds);
		    	console.log(vm.advertisement.budget);

		    	if( vm.advertisement.budget && (  vm.currentUser.funds >= vm.advertisement.budget  )){
		    		vm.validation.budget = true;
		    	}
		    	else{
					vm.validation.budget = false;	    	
		    	}


		    	if (vm.advertisement.basevalue < vm.advertisement.budget){
		    		vm.validation.value = true;
		    	}
		    	else{
		    		vm.validation.value = false;		    		
		    	}
		    	validcheck();

		    }

		   
			function landingchange(){

			} 

			function namechange(){
				if( vm.advertisement.name){
					vm.validation.name = true;
				}
				else{
					vm.validation.name = false;
				}

				if( vm.advertisement.landingURL){
					vm.validation.url = true;
				}
				else{
					vm.validation.url = false;
				}
				validcheck();


			}

			function validcheck(){
				if( (vm.validation.img == true) && (vm.validation.budget == true) && (vm.validation.value == true)
				 	&& (vm.validation.name == true) && (vm.validation.url == true) 	){
					vm.validation.all = true;
				}
				else{
					vm.validation.all = false;
				}
				console.log(vm.validation);
			}



		    

		  
  }


  	

})();


