(function () {
  'use strict';

  angular.module('BlurAdmin.pages.classified', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('classified', {
          url: '/classified',
          templateUrl: 'app/pages/classified/classified.html',
          title: 'Classified',
          controller: 'staycool as vm',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();