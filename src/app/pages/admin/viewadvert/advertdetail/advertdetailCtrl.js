(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.viewadvert')
      .controller('AadvertdetailCtrl', AadvertdetailCtrl);
  /** @ngInject */
  function AadvertdetailCtrl(  $firebaseArray, $state, $uibModal, toastr, $scope) {    	
  	var vm = this;

    vm.open = open;
    vm.Append = Append;
    vm.allpublish = allpublish;

   
    var Ref = new firebase.database().ref('advertisement');
    var getAds =  $firebaseArray(Ref);

    

    getAds.$loaded().then(function (){
      vm.advertisement = getAds.$getRecord($state.params.id);            
    });

    function open(page, type) {


          $uibModal.open({
            animation: true,
            templateUrl: page,  
            controller: 'AadvertdetailCtrl' ,
            controllerAs: 'vm',         
            resolve: {
              items: function () {                
                return $scope.items;
              }
            }
          }).closed.then(function(){
         
          Append(type);
         
        });
    }

    function Append(type) {

     var rootref = new firebase.database().ref();
     var array =  $firebaseArray(Ref);

      if(type == 1){      

          vm.advertisement.Status = "Active";    

          console.log( vm.advertisement);
          getAds.$save(vm.advertisement).then(function(){

          allpublish( $state.params.id);
          $state.go('admin.viewadvert');
          toastr.success('Advertisement Approved');

          });
      }
      else if(type == 0){      

          vm.advertisement.Status = "Reject";    
          console.log( vm.advertisement);

          getAds.$save(vm.advertisement).then(function(){
          
          $state.go('admin.viewadvert');
          toastr.warning('Advertisement Rejected');

          });
      }      
    }

    //Update all publish item

      function allpublish(id){
        
        var  PubRef = new firebase.database().ref("publisher");
        var  AdpubRef = new firebase.database().ref("adpublishing");
        var  AdsRef = new firebase.database().ref("advertisement");

        $firebaseArray(PubRef).$loaded().then(function (publishers){  
           publishers.forEach(function(publisher) { 
               var adsid = id ;  

               vm.adpublishing = {
                view : 0,
                click: 0,
                publisher: {},
                advertisement: {},
              };

              vm.adpublishing.advertisement[adsid] = true;
              vm.adpublishing.publisher[publisher.$id] = true;
              vm.adpublishing.advertisement.BannerURL = vm.advertisement.BannerURL;
              vm.adpublishing.advertisement.LandingURL = vm.advertisement.LandingURL;
              vm.adpublishing.advertisement.Name = vm.advertisement.Name;


              $firebaseArray(AdpubRef).$add(vm.adpublishing).then(function(newid) {
                  
                  if (vm.advertisement.AdsPublishing == null || vm.advertisement.AdsPublishing == ""){
                    vm.advertisement.AdsPublishing = {};
                  }

                  var adspub =  vm.advertisement.AdsPublishing;
                  adspub[newid.key] = true; 
                  getAds.$save(vm.advertisement);

                  if(publisher.adpublishing == null || publisher.adpublishing == "" ){
                    publisher.adpublishing = {};
                  }                 

                  var pubads= publisher.adpublishing;
                  pubads[newid.key] = true;
                                 
                  publisher.adpublishing = pubads;
                  publishers.$save(publisher);




              });            
           });        
        });      

        
      }

    /*function allpublish(id){
        var  ref = new firebase.database().ref("publisher");
        

        $firebaseArray(ref).$loaded().then(function (publishers){            
            publishers.forEach(function(publisher) {                  

                 var adsid = id ;    
                 

                 if(publisher.advertisement == null){
                    publisher.advertisement = {};
                 }                 

                 var pubads= publisher.advertisement
                 pubads[adsid] = true;
                                 
                 publisher.advertisement = pubads;
                 publishers.$save(publisher);

                 if (vm.advertisement.AdsPublishing == null || vm.advertisement.AdsPublishing == ""){
                    vm.advertisement.AdsPublishing = {};
                 }

                 var adspub =  vm.advertisement.AdsPublishing;
                 adspub[publisher.$id] = true; 
                 getAds.$save(vm.advertisement);
                  

            });  
        });
    }*/



  }

  	
})();


