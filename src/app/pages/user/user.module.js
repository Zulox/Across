(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user', [
    'BlurAdmin.pages.user.classified',
    'BlurAdmin.pages.user.addadvert',
    'BlurAdmin.pages.user.viewadvert',  
    //'BlurAdmin.pages.user.template',
    'BlurAdmin.pages.user.dashboard',
    'BlurAdmin.pages.user.publishing',
    //'BlurAdmin.pages.user.ui',    
    //'BlurAdmin.pages.user.form',
    //'BlurAdmin.pages.user.tables',
    //'BlurAdmin.pages.user.charts',  

    'BlurAdmin.pages.user.profile',


    ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user', {
          url: '/user',
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
          templateUrl: 'app/pages/user/user.html',
          redirectTo: 'dashboard.home'
   
        });
  }

})();

