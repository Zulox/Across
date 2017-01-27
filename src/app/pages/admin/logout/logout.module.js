(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.logout', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.logout', {
          url: '/logout',
          templateUrl: 'app/pages/admin/logout/logout.html',
          title: 'LOG OUT',          
          controller: 'AlogoutCtrl as vm',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();