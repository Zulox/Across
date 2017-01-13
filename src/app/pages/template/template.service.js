(function() {
  "use strict";
    
    angular
        .module("BlurAdmin.pages.template")
        .factory("templateFac", function(){
        	
           var vm = this;

           vm.rootpath  = new firebase.database().ref();
           
           
          function function1(){                         
          }


          function function2(){                         
          }


          function function3(){            
            
          }

            return {
                  function1     : function1,   
                  function2     : function2,
                  function3     : function3                
            };
         });  
})();