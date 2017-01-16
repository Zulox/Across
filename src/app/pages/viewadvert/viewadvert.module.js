(function () {
  'use strict';

  angular.module('BlurAdmin.pages.viewadvert', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.viewadvert', {
          url: '/viewadvert',
          templateUrl: 'app/pages/viewadvert/viewadvert.html',
          title: 'View Advert',
          controller: 'viewadvertCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-filing',
            order: 3,
          },
        });
  }

})();