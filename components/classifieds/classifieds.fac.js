(function() {
  "use strict";
    
    angular
        .module("ngClassifieds")
        .factory("facto", function($http , $firebaseArray ){
        

    

    var config = {
    apiKey: "AIzaSyArdgjO-bA7t0wtQSm9L8jDhMVC2nY41rk",
    authDomain: "classified-4d0bd.firebaseapp.com",
    databaseURL: "https://classified-4d0bd.firebaseio.com",
    storageBucket: "classified-4d0bd.appspot.com",
    messagingSenderId: "386156785234"
  };
  firebase.initializeApp(config);

  var rootRef = firebase.database().ref();

        
        return{
           ref : $firebaseArray(rootRef )
            
        }
        
            
        });
    
    
})();