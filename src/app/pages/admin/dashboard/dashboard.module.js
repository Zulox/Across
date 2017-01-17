(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/admin/dashboard/dashboard.html',
          title: 'Dashboard',
          controller: 'AdashboardCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-document',
            order: 0,
          },
        });
  }

})();