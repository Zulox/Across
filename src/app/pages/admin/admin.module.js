(function () {
  'use strict';

  angular.module('BlurAdmin.pages.admin', [

      'BlurAdmin.pages.admin.dashboard',
      'BlurAdmin.pages.admin.viewadvert',
      'BlurAdmin.pages.admin.logout',

    ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin', {
          url: '/admin', 
          resolve: {
              requireAuth: function($state, Auth, $firebaseObject){
              return Auth.$requireSignIn().then(function(auth){
                   var usersRef = firebase.database().ref('users');
                   var userinfo = $firebaseObject(usersRef.child(auth.uid));
                   userinfo.$loaded().then(function (){
                      if(userinfo.level === "USER")
                    {
                        $state.go("user.dashboard");
                    }                      
                   });

              }, function(error){
                 $state.go("login");
              });
            }
          },         
          templateUrl: 'app/pages/admin/admin.html',
          redirectTo: 'admin.dashboard'   
        });
  }

})();

