(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.classified', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.classified', {
          url: '/logout',
          templateUrl: 'app/pages/user/classified/classified.html',
          title: 'LOG OUT',
          controller: 'staycool as vm',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();