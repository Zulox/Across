(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user.publishing.pubpanel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.publishing.pubpanel', {
          url: '/panel',
          templateUrl: 'app/pages/user/publishing/pubpanel/pubpanel.html',
          title: 'Publishing',
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
          controller: 'pubpanelCtrl as vm',          
          sidebarMeta: {           
            order: 0,
          },
        });
  }

})();