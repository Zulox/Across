(function(){

    
    "use stricts";
    
    angular
        .module("Across")
        .controller("classifiedsCtrl", function($scope,$state , $http,facto, $mdDialog ,$mdToast ,$mdSidenav){
        
        var vm = this;



        vm.categories;
        vm.classified;
        vm.classifieds;
        vm.closeSidebar = closeSidebar;
        vm.delClassified = delClassified; 
        vm.editing;
        vm.editClassified = editClassified;
        vm.openSidebar = openSidebar;      
        vm.saveEdit = saveEdit;
        vm.saveData = saveData;

        vm.classifieds = facto.ref;
        vm.classifieds.$loaded().then(function (classifieds){
          vm.categories = getcat(classifieds);
        });
       


        $scope.$on('newClassified', function(event, data){
           vm.classifieds.$add(data);
           console.log(data); 
          showToast("New Classified Added");       
        }); 

        $scope.$on('editSaved', function(event, msg){         
          showToast(msg);       
        }); 

      
        
        function openSidebar(){
          console.log("What222");
        	$state.go('classifieds.new');
        }
       
       function closeSidebar(){
        	$mdSidenav("left").close();
        }
        

        function editClassified(datas){
          //console.log(datas);
        	$state.go('classifieds.edit', {
            id: datas.$id
          });
        }
        
        function saveEdit(){
        	vm.editing = false;
        	vm.classified = {};
        	closeSidebar();
        	showToast("Edit Saved");
        }
        
        function saveData(singleData){
        	
        	if(singleData){
        		singleData.contact = contact;
				vm.classifieds.push(singleData); 
	        	closeSidebar();
	        	vm.classified = {};
	        	showToast("New Classified Added");	        	
        	}
      	}  

		function delClassified(event,datas){
			var confirm = $mdDialog.confirm()
				.title('Are you sure you want to delete '+datas.title+ '?')
				.ok('YES')
				.cancel('NO')
				.targetEvent(event);

				$mdDialog.show(confirm).then(function(){
					
          vm.classifieds.$remove(datas);


					showToast("Classified Deleted");
				}, function(){

				});      
        }


      	function showToast(message){

      		$mdToast.show(

	        		$mdToast.simple()
	        			.content(message)
	        			.position("bottom, right")
	        			.hideDelay(3000)
	        	);
      	}

      	function getcat(classifieds){

      		var categories = [];
      		angular.forEach(classifieds, function(item) {
      			angular.forEach(item.categories, function(category) {
      				categories.push(category); 
  				});
  			});

  			return	_.uniq(categories);		

      	}

       
       


    });   
})();