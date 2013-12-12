'use strict';

var twilio = require('twilio'),
	config = require('nconf'),
	accountSid = config.get('accountSid'),
	authToken = config.get('authToken'),
	client = new twilio.RestClient(accountSid, authToken),
	fs = require('fs'),
	_=require('underscore'),
	S = require('string'),

	Mongolian = require("mongolian"),
	dbserver = new Mongolian(),
	database = dbserver.db("test"),
	result = database.collection("mycol");

module.exports = function (server) {
/*******
TODO:
- if the mobile number is whitelisted, process Msg, else note the mobile number & quit
- Process Msg: Parse the msg and split/recongnize the Shortcodes
- Send data to the Java file.
********/
	
	function process (req, res, next) {
		console.log('inside process');
		result.findOne({ name: "latha" }, function(err, post) {
		    console.log(post);
		});

		next();
	} 

    server.get('/register', process, function (req, res) {
        // var model = { name: 'wfm' };
        var model = '';
        res.render('register/register', model);
        
    });

};
