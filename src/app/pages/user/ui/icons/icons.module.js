/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.ui.icons', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.ui.icons', {
          url: '/icons',
          templateUrl: 'app/pages/user/ui/icons/icons.html',
          controller: 'IconsPageCtrl',
          title: 'Icons',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
