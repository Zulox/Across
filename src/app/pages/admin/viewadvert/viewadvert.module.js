(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.viewadvert', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.viewadvert', {
          url: '/viewadvert',
          templateUrl: 'app/pages/admin/viewadvert/viewadvert.html',
          title: 'View Advert',
          controller: 'aviewadvertCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-filing',
            order: 3,
          },
        });
  }

})();