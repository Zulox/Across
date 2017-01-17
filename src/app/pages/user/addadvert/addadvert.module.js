(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.addadvert', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.addadvert', {
          url: '/addadvert',
          templateUrl: 'app/pages/user/addadvert/addadvert.html',
          title: 'Upload',
          controller: 'addadvertCtrl as vm',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 3,
          },
        });
  }

})();