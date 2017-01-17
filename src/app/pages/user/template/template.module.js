(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.template', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.template', {
          url: '/template',
          templateUrl: 'app/pages/user/template/template.html',
          title: 'template',
          controller: 'templateCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-document',
            order: 0,
          },
        });
  }

})();