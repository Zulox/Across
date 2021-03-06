(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.publishing', [
   
    'BlurAdmin.pages.user.publishing.pubpanel'])
      
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.publishing', {
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