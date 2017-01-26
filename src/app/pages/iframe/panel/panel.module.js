(function () {
  'use strict';

  angular.module('BlurAdmin.pages.iframe.panel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('frame', {
          url: '/frame/:id',
          controller: 'iframeCtrl as vm',
          templateUrl: 'app/pages/iframe/panel/iframe.html',
        })
        



        ;
  }

})();