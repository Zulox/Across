(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.adminsignup', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('Admincreate', {
          url: '/Createadmin',
          templateUrl: 'app/pages/auth/adminsignup/adminsignup.html',         
          controller: 'AdminsignupCtrl as vm',          
        })
        



        ;
  }

})();