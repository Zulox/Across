(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.viewadvert.advertdetail', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.viewadvert.detail',{
            url: '/detail/:id', 
            templateUrl: 'app/pages/admin/viewadvert/advertdetail/advertdetail.html',
            controller: 'AadvertdetailCtrl as vm',
            params:{
                advertisement: null
            }
        });
  }

})();