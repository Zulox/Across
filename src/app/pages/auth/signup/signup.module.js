(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth.signup', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: 'app/pages/auth/signup/signup.html',
          title: 'Registration',
          controller: 'AuthSignupCtrl as vm',
          
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