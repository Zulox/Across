(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.adminsignin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('adminlogin', {
          url: '/Admin',
          templateUrl: 'app/pages/auth/adminsignin/adminsignin.html',
          title: 'Login',
          controller: 'AdminsigninCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-play',
            order: 1,
          },        
        })
        



        ;
  }

})();