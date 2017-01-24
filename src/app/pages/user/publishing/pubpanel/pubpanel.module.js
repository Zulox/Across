(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.publishing.pubpanel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.publishing.pubpanel', {
          url: '/panel',
          templateUrl: 'app/pages/user/publishing/pubpanel/pubpanel.html',
          title: 'Publishing',
          controller: 'pubpanelCtrl as vm',          
          sidebarMeta: {           
            order: 0,
          },
        });
  }

})();