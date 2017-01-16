(function () {
  'use strict';

  angular.module('BlurAdmin.pages.viewadvert')
      .controller('viewadvertCtrl', viewadvertCtrl);
  /** @ngInject */
  function viewadvertCtrl(  viewadvertFac, $firebaseArray) {    	
		var vm = this;

    vm.defaultpic = "assets/img/noimage.png";



		vm.getAdvert = function (){

			viewadvertFac.getAdvert();
		}

	/*	var userID = 'mkPtVM3quATFzX5lYnbpj42CdPu1';
		var advertRef = new firebase.database().ref('advertisement');
		var queryz =   advertRef.orderByChild('Owner/'+userID).equalTo(true);
		vm.advertisements = $firebaseArray(queryz) ;*/
		viewadvertFac.getAdvert().then(function(data){
            vm.advertisements = data;
            console.log( vm.advertisements);
        });

  }

  	

})();


