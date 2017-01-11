(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth', [
    'BlurAdmin.pages.auth.signup', 
    'BlurAdmin.pages.auth.signin'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {

 
   
  }

})();