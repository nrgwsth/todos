"use strict";

const path = require("path");
const User = require("./../models/User");

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

	app.post("/api/makenewnote", function(req, res){
		console.log(req.body);
		User.findOneAndUpdate({
			id: req.body.id
		},{
			$push:{
				"notes": req.body.note
			}
		}, function(err, model){
			if(err) throw err;
			res.send("");
		})
	})

	app.post("/api/deletenote", function(req, res){
		User.findOne({
			id:req.body.id
		}).exec((err, user)=>{
			if(err) throw err;

			user.notes.splice(req.body.index, 1);
			user.save();
			res.send("");
		})
	});

	app.post("/logout", function(req, res){
		req.logout();
		res.redirect("/");
	})
}