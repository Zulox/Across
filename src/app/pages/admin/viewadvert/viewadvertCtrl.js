(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.viewadvert')
      .controller('aviewadvertCtrl', aviewadvertCtrl);
  /** @ngInject */
  function aviewadvertCtrl(  aviewadvertFac, $firebaseArray) {    	
		var vm = this;

    vm.defaultpic = "assets/img/noimage.png";



		vm.getAdvert = function (){

			viewadvertFac.getAdvert();
		}

		aviewadvertFac.getAdvert().then(function(data){
       vm.advertisements = data;   
       console.log(data)        ;
    });

  // aviewadvertFac.getAdvert();
  }

  	

})();


