(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.template', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.template', {
          url: '/template',
          templateUrl: 'app/pages/admin/template/template.html',
          title: 'template',
          controller: 'templateCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-document',
            order: 0,
          },
        });
  }

})();