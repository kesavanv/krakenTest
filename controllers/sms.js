'use strict';

var twilio = require('twilio'),
	config = require('nconf'),
	accountSid = config.get('accountSid'),
	authToken = config.get('authToken'),
	client = new twilio.RestClient(accountSid, authToken),
	fs = require('fs'),
	_=require('underscore'),
	S = require('string');


module.exports = function (server) {
/*******
TODO:
- get latest message for every second
- ignore message if 'sid' is same as previous one, else continue
- if the mobile number is whitelisted, process Msg, else note the mobile number & quit
- Process Msg: Parse the msg and split/recongnize the Shortcodes
- Send data to the Java file.
********/
	var appData = JSON.parse(fs.readFileSync('./public/data/temp.json', 'utf8')),
		whitelist = appData.whitelist;

	function isWhitelisted (phoneNumber) {
		var result = false;
		for (var index in whitelist) {
			if (whitelist[index] === phoneNumber) {
				result = true;
				break;
			}
		}
		return result;
	}

	function process (req, res, next) {
		var messageId = '',
			latestMsg;

		setInterval (function () {
			client.messages.list({    
			}, function(err, data) { 
				latestMsg = data.messages[0];

				//proceed if the phone number is whitelisted
				// if (isWhitelisted(latestMsg.from)) {
				if (_.contains(whitelist, latestMsg.from)) {
					console.log('this number is whitelisted');

					//check if 'sid' is same as previous one
					if (latestMsg.sid !== messageId) {
						console.log('NEW MESSAGE ARRIVED');
						console.log(latestMsg.body);
						messageId = latestMsg.sid;

					} else {
						console.log('No new messages ... ...');
					}

				} else {
					if (latestMsg.sid !== messageId) {
						console.log('Unregistered user ... !', latestMsg.from);
					} else{
						console.log('No new messages ... ...');
					}
				}
			});
		}, 1000);
		next();
	} 

    server.get('/sms', process, function (req, res) {
        var model = { name: 'wfm' };
        
        res.render('index', model);
        
    });

};
