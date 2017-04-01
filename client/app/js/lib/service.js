/**app.factory("auth", ["$http", function($http) {
		const auth = {}

		auth.isUserLoggedIn = function() {
			let promise = new Promise((resolve, reject) => {
				if (localStorage.getItem("tuser") === null) {
					$http.get("/api/isuserloggedin").then((res) => {
						console.log(res.data);
						if (res.data) {
							localStorage.setItem("tuser", JSON.stringify(res.body));
						}
						resolve(res.data);
					});
				} else {
					resolve(JSON.parse(localStorage.getItem("tuser")));
				}
			})

		}

		return auth;
	}]);
}]);**/