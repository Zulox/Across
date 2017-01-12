(function () {
  'use strict';

  angular.module('BlurAdmin.pages.publishing.pubpanel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('publishing.pubpanel', {
          url: '/panel',
          templateUrl: 'app/pages/publishing/pubpanel/pubpanel.html',
          title: 'Panel',
          controller: 'pubpanelCtrl as vm',          
          sidebarMeta: {           
            order: 0,
          },
        });
  }

})();