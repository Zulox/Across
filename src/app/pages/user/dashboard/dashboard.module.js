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
            requireAuth: function($state, Auth,AuthUser, $firebaseObject){
            return Auth.$requireSignIn().then(function(auth){
                  AuthUser.getConnecting();
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
          controller: 'dashboardCtrl as vm',          
          sidebarMeta: {           
            order: 0,
            icon: 'ion-home',
          },
        });
  }

})();