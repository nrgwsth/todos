"use strict";

const express = require("express");

const app = express();

const passport = require("passport");

const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const bluebird = require("bluebird");

const path = require("path");

const configurePassport = require("./api/auth/configurePassport");

app.use(express.static(path.resolve(__dirname, "./../client/app")));

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();

mongoose.Promise = bluebird;

mongoose.connect("mongodb://localhost:todos", function(err){
	if(err){
		throw err;
	} else{
		console.log("Successfully connected to mongodb server");
	}
});

configurePassport(passport);

require("./api/auth/")(app, passport);
require("./api/")(app);

app.listen(PORT, function(){
	console.log(`server is listening on port ${PORT}`);
});