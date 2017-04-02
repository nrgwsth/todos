"use strict";

var app = angular.module("todosapp", []).config(["$provide", function($provide){
	$provide.factory("api", ["$http", function($http) {
		const api = {}

		api.isUserLoggedIn = function() {
			let promise = new Promise((resolve, reject) => {
				if (localStorage.getItem("tuser") === null) {
					$http.get("/api/isuserloggedin").then((res) => {
						console.log(res);
						if (res.data) {
							localStorage.setItem("tuser", JSON.stringify(res.data));
						}
						resolve(res.data);
					});
				} else {

					resolve(JSON.parse(localStorage.getItem("tuser")));
				}
			})

			return promise;

		}

		api.makeNewNote = function(user, note){
			$http({
				method: 'POST',
  				url: '/api/makenewnote',
  				data: {
  					id: user.id,
					note:note
  				}
			}).then(res=>{
				user.notes.push(note);
				localStorage.setItem("tuser", JSON.stringify(user));
			});
		}

		api.deleteNote = function(user, i){
			$http({
				method: 'POST',
  				url: '/api/deletenote',
  				data: {
  					id: user.id,
					index: i
  				}
			}).then(res=>{
				user.notes.splice(i,1);
				localStorage.setItem("tuser", JSON.stringify(user));
			});
		}

		api.onLogoutClick = function(){
			const promise = new Promise((resolve, reject)=>{

				localStorage.removeItem("tuser");
				$http.post("/logout",{}).then(res=>{

				});

				resolve(null);
			})
		
			return promise;
		
		}

		return api;
	}]);
}]);
