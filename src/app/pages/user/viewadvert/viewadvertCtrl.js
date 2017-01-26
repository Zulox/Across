(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.viewadvert')
      .controller('viewadvertCtrl', viewadvertCtrl);
  /** @ngInject */
  function viewadvertCtrl(  viewadvertFac, $firebaseArray, $state) {    	
		var vm = this;

    vm.defaultpic = "assets/img/noimage.png";
    vm.advertDetail = advertDetail;


		vm.getAdvert = function (){

			viewadvertFac.getAdvert();
		}

	/*	var userID = 'mkPtVM3quATFzX5lYnbpj42CdPu1';
		var advertRef = new firebase.database().ref('advertisement');
		var queryz =   advertRef.orderByChild('Owner/'+userID).equalTo(true);
		vm.advertisements = $firebaseArray(queryz) ;*/
		viewadvertFac.getAdverts().then(function(data){
            vm.advertisements = data;
            console.log( vm.advertisements);
        });

 
    function advertDetail(datas){         
      console.log(datas.$id);    
        $state.go('user.viewadvert.detail', {
          id: datas.$id
        });
    }

  }

  

  	

})();


