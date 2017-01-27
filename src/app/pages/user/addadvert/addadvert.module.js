(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.addadvert', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.addadvert', {
          url: '/addadvert',
          templateUrl: 'app/pages/user/addadvert/addadvert.html',
          title: 'Add Advert',
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
          controller: 'addadvertCtrl as vm',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 3,
          },
        });
  }

})();