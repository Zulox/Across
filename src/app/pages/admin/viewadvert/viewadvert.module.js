(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin.viewadvert', [  
                 'BlurAdmin.pages.admin.viewadvert.advertdetail',  
    ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.viewadvert', {
          url: '/viewadvert',
          templateUrl: 'app/pages/admin/viewadvert/viewadvert.html',
          title: 'View Advert',
          controller: 'aviewadvertCtrl as vm',          
          sidebarMeta: {
            icon: 'ion-filing',
            order: 3,
          },
        })
        .state('admin.viewadvert.hi',{
            url: '/hi',
            parent: 'admin.viewadvert',
            templateUrl: 'app/pages/admin/viewadvert/advertdetail/hi.html',
           
        });


        
  }

})();