/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.ui', [
    'BlurAdmin.pages.user.ui.typography',
    'BlurAdmin.pages.user.ui.buttons',
    'BlurAdmin.pages.user.ui.icons',
    'BlurAdmin.pages.user.ui.modals',
    'BlurAdmin.pages.user.ui.grid',
    'BlurAdmin.pages.user.ui.alerts',
    'BlurAdmin.pages.user.ui.notifications',
    'BlurAdmin.pages.user.ui.tabs',    
    'BlurAdmin.pages.user.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.ui', {
          url: '/ui',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
