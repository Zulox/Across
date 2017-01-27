/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/user/dashboard/dashboard.html',
          title: 'Dashboard',
          resolve: {
              requireAuth: function($state, Auth, $firebaseObject){
              return Auth.$requireSignIn().then(function(auth){
                   var usersRef = firebase.database().ref('users');
                   var userinfo = $firebaseObject(usersRef.child(auth.uid));
                   userinfo.$loaded().then(function (){
                      if(userinfo.level === "ADMIN")
                    {
                        $state.go("admin.dashboard");
                    }                      
                   });

              }, function(error){
                 $state.go("login");
              });
            }
          },
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
