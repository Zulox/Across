(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.viewadvert')
      .controller('aviewadvertCtrl', aviewadvertCtrl);
  /** @ngInject */
  function aviewadvertCtrl(  aviewadvertFac , $state ) {    	
		var vm = this;
    vm.advertDetail = advertDetail;


    vm.defaultpic = "assets/img/noimage.png";



		vm.getAdvert = function (){

			viewadvertFac.getAdvert();
		}

		aviewadvertFac.getAdvert().then(function(data){
       vm.advertisements = data;   
       console.log(data)        ;
    });

  // aviewadvertFac.getAdvert();

    function advertDetail(datas){         
      console.log(datas.$id);    
        $state.go('admin.viewadvert.detail', {
          id: datas.$id
        });
    }

  }

  	

})();


