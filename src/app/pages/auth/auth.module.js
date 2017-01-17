(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth', [
    'BlurAdmin.pages.auth.signup', 
    'BlurAdmin.pages.auth.signin',
    'BlurAdmin.pages.auth.adminsignin',
    'BlurAdmin.pages.auth.adminsignup',

    ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {

 
   
  }

})();