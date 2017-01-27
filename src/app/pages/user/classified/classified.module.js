(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.classified', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.classified', {
          url: '/logout',
          templateUrl: 'app/pages/user/classified/classified.html',
          title: 'LOG OUT',
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
          controller: 'staycool as vm',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();