(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user', {
          url: '/user',          
          templateUrl: 'app/pages/user/user.html',
          redirectTo: 'dashboard.home'
   
        });
  }

})();

