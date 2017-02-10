(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.viewadvert.advertdetail', ['ngFileUpload'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.viewadvert.detail',{
            url: '/detail/:id', 
            templateUrl: 'app/pages/user/viewadvert/advertdetail/advertdetail.html',
            controller: 'AdvertdetailCtrl as vm',
            resolve: {
            getAuth: function(AuthUser){
                AuthUser.getConnecting();

            }
          },
            params:{
                advertisement: null
            }
        });
  }

})();