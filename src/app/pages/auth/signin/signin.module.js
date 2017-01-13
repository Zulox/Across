(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.signin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/pages/auth/signin/signin.html',
          title: 'Login',
          controller: 'AuthSigninCtrl as vm',
          
          resolve: {
            mustnotAuth: function($state, Auth){
              return Auth.$requireSignIn().then(function(auth){
                console.log("user logged in");
                $state.go('dashboard');
              }, function(error){
                  console.log("not logged in");
              });
            }
          },
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },        
        })
        



        ;
  }

})();