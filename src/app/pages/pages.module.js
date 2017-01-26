/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.auth',
    'BlurAdmin.pages.admin',
    'BlurAdmin.pages.user',
    'BlurAdmin.pages.iframe',

  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/user/dashboard');

  }

})();
