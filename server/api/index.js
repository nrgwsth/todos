"use strict";

const path = require("path");

module.exports = function(app, passport){
	app.get("/", function(req, res){
		res.sendFile(path.resolve(__dirname, "./../../client/index.html"));
	})
}