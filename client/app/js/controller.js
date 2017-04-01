app.controller("mainCtrl", ["$scope", "auth", function($scope, auth) {
	
	$scope.loginDivVisibility = false;

	auth.isUserLoggedIn().then((user)=>{
		if(user == null){
			$scope.loginDivVisibility = true;
		} else{
			$scope.$apply(function(){
				$scope.loginDivVisibility = false;
			})
			
		}
	});

	$scope.notes = [{
		title: "sample note 1",
		value: "lorem ipsum dolor amet",
		color: "aqua"
	}, {
		title: "sample note 2",
		value: "lorem ipsum dolor amet",
		color: "beige"
	}, {
		title: "sapmle note 3",
		value: "lorem ipsum dolor amet",
		color: "coral"
	}];

	$scope.newNote = {
		title: "",
		value: "",
		color: "azure"
	}

	$scope.colors = ["beige", "aquamarine", "azure", "crimson", "coral", "gold"];
	$scope.onclick = function(note, i) {
		$scope.notes.splice(i, 1);
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
}]);