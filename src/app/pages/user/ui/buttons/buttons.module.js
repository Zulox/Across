/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.ui.buttons', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.ui.buttons', {
          url: '/buttons',
          templateUrl: 'app/pages/user/ui/buttons/buttons.html',
          controller: 'ButtonPageCtrl',
          title: 'Buttons',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();
