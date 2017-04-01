"use strict";

const path = require("path");

module.exports = function(app, passport){
	app.get("/", function(req, res){
		res.sendFile(path.resolve(__dirname, "./../../client/index.html"));
	});

	app.get("/api/isuserloggedin", function(req, res){
		console.log("/api/isuserloggedin");
		if(req.user){
			res.json(req.user);
		} else{
			res.json(null);
		}
	});
}