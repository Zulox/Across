(function () {
  'use strict';

  angular.module('BlurAdmin.pages.template', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('template', {
          url: '/template',
          templateUrl: 'app/pages/template/template.html',
          title: 'template',
          controller: 'templateCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-document',
            order: 0,
          },
        });
  }

})();