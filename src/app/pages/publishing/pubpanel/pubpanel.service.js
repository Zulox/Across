(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.publishing.pubpanel")
        .factory("pubpanelFac", function($firebaseAuth, AuthUser , $firebaseArray, toastr){
        	
           var vm = this;

           vm.rootpath  = new firebase.database().ref();
           


            function setPublisher(){            
              var currentUser = AuthUser.getConnecting();
              var userID  = currentUser.$id;

              var publisherRef = new firebase.database().ref('publisher');   
              var publisher = $firebaseArray(publisherRef);

              publisher
                .$add({  
                    Totalrevenue: 0,
                    Totalview : 0,
                    Totalclick : 0                                        
                })
                .then(function(pogback) {
                  var id = pogback.key;
                  vm.rootpath.child("/users/"+ userID+"/publisher/" + id).set(true);
                  vm.rootpath.child("/publisher/"+id+"/Owner/" + userID).set(true);   

                  toastr.success('Congratulation on becoming a Publisher!');   
                  
                });

            }


            function getExistpub(){            
             var publisherRef = new firebase.database().ref('users');

             var currentUser = AuthUser.getConnecting();
             var userID  = currentUser.$id;
             userID = 'mkPtVM3quATFzX5lYnbpj42CdPu1';

             publisherRef.child(userID + '/publisher').once("value", function(snapshot) {
                console.log(snapshot.exists());
            }); 
           }


            function getPubdata(){            
             var publisherRef = new firebase.database().ref('publisher');

             var currentUser = AuthUser.getConnecting();
             var userID  = currentUser.$id;
             userID = 'mkPtVM3quATFzX5lYnbpj42CdPu1';

             
             publisherRef.orderByChild('Owner/'+userID).equalTo(true).on('value', function(snap) {
                console.log(snap.val());
            });
            }


            return {
                  setPublisher     : setPublisher,   
                  getExistpub      : getExistpub,
                  getPubdata       : getPubdata                
            };
         });  
})();