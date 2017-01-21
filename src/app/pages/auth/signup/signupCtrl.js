(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.signup')
      .controller('AuthSignupCtrl', AuthSignupCtrl);
  /** @ngInject */
  function AuthSignupCtrl($scope, $state, Auth, toastr, $firebaseArray) {
    	console.log("Auth Controller ");
    	var vm = this;
    		// bower install --save angular
			
			vm.user;

			vm.linkadpub = linkadpub;
			
			vm.user = {
		      email: '',
		      password: '',
		      fullname: '',
		      contact: '',

		    };

		    vm.setpublisher;
		    
			vm.register = function(){
				vm.error = '';				
			    Auth.$createUserWithEmailAndPassword(vm.user.email, vm.user.password).then(function (user){			    
			   			   
			    var authData = Auth.$getAuth();
			    if (authData) {				  
				  				  
				  firebase.database().ref('users/' + authData.uid).set({				    
				    email: vm.user.email,
				    fullname: vm.user.fullname,
				    contact : vm.user.contact,
				    funds : 0,
				    level : "USER",
				  }).then(function(){
				  	 
				  	 createPublisher(authData.uid);

				  });
				 
				  
				} else {
				  console.log("Logged out");
				}
				


			  }, function (error){
			    vm.error = error;
			  });
			};

			function createPublisher(uid){
				var publisherRef = new firebase.database().ref('publisher');   
              	vm.publisher = $firebaseArray(publisherRef);

              	vm.setpublisher = {
                    Totalrevenue: 0,
                    Totalview : 0,
                    Totalclick : 0,
                    Owner : {},
                    

                } 

                var foo = vm.setpublisher.Owner;

                foo[uid] = true;
                vm.setpublisher.Owner = foo;

                vm.publisher.$add(vm.setpublisher).then(function(pub){
                
                	linkadpub(pub);
            		$state.go('user.dashboard');
			    	toastr.success('Welcome to ACROSS');
                });                                                                                    
			}

			function linkadpub(id){

				var transferid = id.key;
								
				
        		var  AdpubRef = new firebase.database().ref("adpublishing");
        		var  AdsRef = new firebase.database().ref("advertisement");


                
        		var farrayAds = $firebaseArray(AdsRef);

        		//load advertisement
        		farrayAds.$loaded().then(function(advertisements) {
    				advertisements.forEach(function(advertisement) { 
    					if(advertisement.Status == "Active"){
							vm.adpublishing = {
				                view : 0,
				                click: 0,
			    	            publisher: {},
			        	        advertisement: {},
				            };
				            
				            vm.adpublishing.publisher[transferid] = true;
				    
				            vm.adpublishing.advertisement[advertisement.$id] = true; 
				            
				            //add the adpublishing
				            $firebaseArray(AdpubRef).$add(vm.adpublishing).then(function(newid){
				            	
				            	if (advertisement.AdsPublishing == null || advertisement.AdsPublishing == ""){
				                    advertisement.AdsPublishing = {};
			                  	}

				                var adspub =  advertisement.AdsPublishing;
				                adspub[newid.key] = true; 
				                
				            
				                //update ads
				                farrayAds.$save(advertisement);		

				                
				                var connectionPub = vm.publisher.$getRecord(transferid);				                 
				                connectionPub.adpublishing = {};				                
				                var pubads = connectionPub.adpublishing;
				                pubads[newid.key] = true;
				                console.log(connectionPub);

				                vm.publisher.$save(connectionPub);

				                
				                








				            });             				
    					}


    				});

        		});

			}


  }

  	

})();


