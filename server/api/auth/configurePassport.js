"use strict";

const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("./../../models/User");

module.exports = function(passport){
	passport.use(new TwitterStrategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: process.env.Callback_Url
	},
	function(token, tokenSecret, profile, cb) {
			
			User.findOrCreate({
				id: profile.id,
				profile: profile
			}, function(err, user) {
				return cb(err, user);
			});

			return cb(null, profile);
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({
		id: id
	}, function(err, user) {
		done(err, user);
	});
});
}