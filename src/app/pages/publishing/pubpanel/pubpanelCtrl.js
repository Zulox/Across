(function () {
  'use strict';

  angular.module('BlurAdmin.pages.publishing.pubpanel')
      .controller('pubpanelCtrl', pubpanelCtrl);
  /** @ngInject */
  function pubpanelCtrl( $scope, $state,toastr , $http, pubpanelFac) {    	
		var vm = this;

		vm.yolo = "vm is working";
		
		
		vm.becomePub = function(){				
			pubpanelFac.setPublisher();		
		}

		
		//vm.pubexist = pubpanelFac.getExistpub();

		vm.pubdata = pubpanelFac.getPubdata();
		


  }

  	

})();


