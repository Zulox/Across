(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.viewadvert')
      .controller('AdvertdetailCtrl', AdvertdetailCtrl);
  /** @ngInject */
  function AdvertdetailCtrl(  $firebaseArray, AuthUser, $state, $uibModal, toastr, $scope , Upload) {    	
  	var vm = this;

    vm.open = open;
    vm.topup = false;
    vm.topupAmmount;
    vm.budget= {}; 
    
    vm.topupfunc = topupfunc;







    vm.cUser = AuthUser.getConnecting();
    var currentUser = AuthUser.getConnecting();

   
    var Ref = new firebase.database().ref('advertisement');
    var getAds =  $firebaseArray(Ref);

    

    getAds.$loaded().then(function (){
      vm.advertisement = getAds.$getRecord($state.params.id);            
    });

    function open(page, type) {


         vm.modal= $uibModal.open({
            animation: true,
            templateUrl: page,  
            controller: 'AdvertdetailCtrl' ,
            controllerAs: 'vm',
            dismiss: {
              items: function () {
                console.log('gonzo');               
              }
            }            
            
          }).close(function(what){
          console.log(vm.modal);

          //Append(type);
         
        })
        ;
    }

    function Append(type) {

      var rootRef = new firebase.database().ref();
      var array =  $firebaseArray(Ref);
      //Get current Date
      var date = new Date();
      var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        

      if(type == 1){      
          console.log(currentUser);
          vm.advertisement.LastEdit = FromDate;

          var storageRef = firebase.storage().ref();

       

          if(!vm.picFile){
                var query = rootRef.child('advertisement/'+vm.advertisement.$id+'/AdsPublishing' );
                query.once('value').then(function (snap){
                  var adpubkey = Object.keys(snap.val());
                  var updateObj = {};
                  
                  adpubkey.forEach(function (key){                     
                      updateObj['adpublishing/'+key+ '/advertisement/LandingURL'] =  vm.advertisement.LandingURL;
                      updateObj['adpublishing/'+key+ '/advertisement/Name'] =  vm.advertisement.Name;

                      //test delete
                      
                      
                  });

                  rootRef.update(updateObj)
                  .then( function (){
                    console.log("mushi mushi");
                  })
                  .catch( function (){
                    console.log("no mushi");
                  });   

                });

          } 
          else
          {

            var metadata = {
              'contentType': vm.picFile.type
            };
            storageRef.child('asset/img/advertisement/' + $state.params.id).put(vm.picFile, metadata).then(function(snapshot) {
             
              var url = snapshot.downloadURL;
              rootRef.child("/advertisement/"+$state.params.id+"/BannerURL").set(url).then(function (){

                //Atomic Update
                var query = rootRef.child('advertisement/'+vm.advertisement.$id+'/AdsPublishing' );
                query.once('value').then(function (snap){
                  var adpubkey = Object.keys(snap.val());
                  var updateObj = {};
                  
                  adpubkey.forEach(function (key){
                      updateObj['adpublishing/'+key+ '/advertisement/BannerURL'] =  url;
                      updateObj['adpublishing/'+key+ '/advertisement/LandingURL'] =  vm.advertisement.LandingURL;
                      updateObj['adpublishing/'+key+ '/advertisement/Name'] =  vm.advertisement.Name;

                      //test delete
                      
                      
                  });

                  rootRef.update(updateObj)
                  .then( function (){
                    console.log("mushi mushi");
                  })
                  .catch( function (){
                    console.log("no mushi");
                  });   

                });
                                 
             });  
            }).catch(function(error) {
            
              console.error('Upload failed:', error);
            
            });
          }
          
          //rootRef.update('users'+currentUser.$id+ '/advertisement/'+ vm.advertisement.$id);
          getAds.$save(vm.advertisement).then(function(){
          console.log(vm.advertisement);                
          toastr.success('Advertisement Updated');
          });
      }
      else if(type == 0){      

          var query = rootRef.child('advertisement/'+vm.advertisement.$id+'/AdsPublishing' );
          query.once('value').then(function (snap){
            var adpubkey = Object.keys(snap.val());
            var updateObj = {};
            
            adpubkey.forEach(function (key){                                           
                updateObj['adpublishing/'+key+ '/advertisement/Status'] = "Inactive";
            });  
            console.log(updateObj);

            getAds.$remove(vm.advertisement).then(function(){
            
            updateObj['users/'+currentUser.$id+ '/advertisement/'+ vm.advertisement.$id] =  null;

            rootRef.update(updateObj);

            $state.go('user.viewadvert');
            toastr.warning('Advertisement Deleted');
            });
          });
      }      
    }





    function topupfunc(){
      var rootRef = new firebase.database().ref();

      if(vm.topupAmmount){
        if( vm.cUser.funds >= vm.topupAmmount){
          vm.budget.error = false;
          vm.advertisement.Budget +=  vm.topupAmmount;
          getAds.$save(vm.advertisement).then(function(){
            
            if( (vm.advertisement.Status === "Inactive") && (vm.advertisement.Budget > 0)){
                var query = rootRef.child('advertisement/'+vm.advertisement.$id+'/AdsPublishing' );
                query.once('value').then(function (snap){
                  var adpubkey = Object.keys(snap.val());
                  var updateObj = {};
                  
                  adpubkey.forEach(function (key){                                           
                      updateObj['adpublishing/'+key+ '/advertisement/Status'] = "Active";
                  });

                   updateObj['advertisement/'+vm.advertisement.$id+'/Status'] = "Active";

                  rootRef.update(updateObj)
                  .then( function (){
                    console.log("mushi mushi");
                  })
                  .catch( function (){
                    console.log("no mushi");
                  });   

                });

            }
          vm.topup =false  
          toastr.success('Budget Increased');
          });


        }
        else{
          vm.budget.error = true;
        }

      }      

    }

    


   

  }




  	
})();


