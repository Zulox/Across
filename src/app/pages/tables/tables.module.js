/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('user.tables', {
          url: '/tables',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'TablesPageCtrl',
          title: 'Tables',
          sidebarMeta: {        
            icon: 'ion-grid',
            order: 300,
          },
        }).state('user.tables.basic', {
          url: '/basic',
          templateUrl: 'app/pages/tables/basic/tables.html',
          title: 'Basic Tables',
          sidebarMeta: {            
            order: 0,
          },
        }).state('user.tables.smart', {
          url: '/smart',
          templateUrl: 'app/pages/tables/smart/tables.html',
          title: 'Smart Tables',
          sidebarMeta: {            
            order: 100,
          },
        });
    $urlRouterProvider.when('/tables','/tables/basic');
  }

})();
