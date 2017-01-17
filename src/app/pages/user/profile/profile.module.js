/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'app/pages/user/profile/profile.html',
          controller: 'ProfilePageCtrl',
        });
  }

})();
