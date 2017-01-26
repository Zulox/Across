(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.viewadvert', [
    'BlurAdmin.pages.user.viewadvert.advertdetail',
    ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.viewadvert', {
          url: '/viewadvert',
          templateUrl: 'app/pages/user/viewadvert/viewadvert.html',
          title: 'View Advert',
          controller: 'viewadvertCtrl as vm',  
          resolve: {
            getAuth: function(AuthUser){
                AuthUser.getConnecting();

            }
          },
          sidebarMeta: {
            icon: 'ion-filing',
            order: 3,
          },          
        });
  }

})();