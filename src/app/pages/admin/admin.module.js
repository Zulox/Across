(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin', [

      'BlurAdmin.pages.admin.dashboard',
      'BlurAdmin.pages.admin.viewadvert',

    ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin', {
          url: '/admin',          
          templateUrl: 'app/pages/admin/admin.html',
          redirectTo: 'admin.dashboard'   
        });
  }

})();

