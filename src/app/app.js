'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'firebase',


  'BlurAdmin.theme',
  'BlurAdmin.pages'
])
.config(mainConfig);

  /** @ngInject */
  function mainConfig() {

    console.log("Established Across Config")

     var config = {
      apiKey: "AIzaSyBHDAxqq_UJc-JyZwMMtwbbSC1yhcwV_Gw",
      authDomain: "across-be2bb.firebaseapp.com",
      databaseURL: "https://across-be2bb.firebaseio.com",
      storageBucket: "across-be2bb.appspot.com",
      messagingSenderId: "1046683224793"
    };
  firebase.initializeApp(config);
  }


;