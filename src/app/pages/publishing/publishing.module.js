(function () {
  'use strict';

  angular.module('BlurAdmin.pages.publishing', [ 'BlurAdmin.pages.publishing.pubpanel'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('publishing', {
          url: '/publishing',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Publishing',
          sidebarMeta: {
            icon: 'ion-paper-airplane',
            order: 4,
          },
        });
  }

})();