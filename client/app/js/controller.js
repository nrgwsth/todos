app.controller("mainCtrl", ["$scope", "api", function($scope, api) {
	
	$scope.loginDivVisibility = false;

	$scope.user = null;

	$scope.notes = [];

	api.isUserLoggedIn().then((user)=>{
		$scope.user = user;
		if(user == null){
			$scope.$apply(function(){
				$scope.loginDivVisibility = true;
			});
			
		} else{
			$scope.$apply(function(){
				$scope.loginDivVisibility = false;
				$scope.notes = user.notes;
			});
			
		}
	});

	$scope.newNote = {
		title: "",
		value: "",
		color: "azure"
	}

	$scope.colors = ["beige", "aquamarine", "azure", "crimson", "coral", "gold"];

	$scope.onclick = function(note, i) {
		$scope.notes.splice(i, 1);
		api.deleteNote($scope.user, i);
	}
	$scope.isUserTyping = false;

	/**
	$scope.onmouseenter = function(){
	 // console.log("mouse enter");
	  $scope.checkIconVisibility = true;
	}
  
	$scope.onmouseleave = function(){
	  //console.log("mouse leave");
	  $scope.checkIconVisibility = false;
	}
	**/

	$scope.onUserTyping = function() {
		$scope.isUserTyping = true;
	}

	$scope.onFromSubmit = function(newNote) {
		if (newNote.title && newNote.value) {
			$scope.notes.push(newNote);
			api.makeNewNote($scope.user, newNote);

		}
		reset();
	}

	function reset() {
		$scope.newNote = {
			title: "",
			value: "",
			color: "white"
		}
		$scope.isUserTyping = false;
	}

	$scope.isSelectorVisible = false;

	$scope.showSelector = function(bool) {
		$scope.isSelectorVisible = bool;
	}

	$scope.selectColor = function(color) {
		$scope.newNote.color = color;
		$scope.isSelectorVisible = false;
	}

	$scope.onLogoutClick = function(){
		console.log("user logout");
		api.onLogoutClick().then(data=>{
			$scope.$apply(function(){
				$scope.user = null;
				$scope.loginDivVisibility = true;
			})
			
		})
	}
}]);