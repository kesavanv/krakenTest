'use strict';

var twilio = require('twilio'),
	config = require('nconf'),
	accountSid = config.get('accountSid'),
	authToken = config.get('authToken'),
	client = new twilio.RestClient(accountSid, authToken),
	fs = require('fs'),
	_=require('underscore'),
	S = require('string'),
	JavaMiddleware = require('./javaMiddleware');


module.exports = function (server) {

	var appData = JSON.parse(fs.readFileSync('./public/data/temp.json', 'utf8')),
		whitelist = appData.whitelist;

	function processRequest (message, sender) {
		var parsedMessage = S(message).parseCSV(' ', null),
			command = parsedMessage[0].toUpperCase(),
			oReply = {},
			javaMiddleware = new JavaMiddleware();

		switch (command) {
		case 'HELP':
			console.log('send HELP');
			break;

		case 'BUILD':
			var streamName = parsedMessage[1];
			console.log('build this stream: ', streamName);
			// javaMiddleware.buildStream(streamName);
			break;

		case 'DEPLOY':
			var buildId = parsedMessage[1],
				lab = parsedMessage[2];
			console.log('Deploy this build Id:', buildId, 'in the lab', lab);
			// javaMiddleware.deployBuild(buildId, lab);
			break;

		default:
			console.log('Not a valid COMMAND, show HELP');
			break;
		}

		return sender;
	}

	function findLatestMsg (messageList) {
		var msgLength = messageList.length,
			latestMsg, 
			i;

		for (i=0; i<=msgLength; i+=1) {
			console.log(messageList[i].direction);
			if (messageList[i].direction === 'inbound') {
				latestMsg = messageList[i];
				break;
			}
		}
		return latestMsg;
	}

	function verifyMessage (latestMsg) {
		var messageId = '';

		//proceed if the phone number is whitelisted
		if (_.contains(whitelist, latestMsg.from)) {
			// console.log('this number is whitelisted');

			//check if 'sid' is same as previous one
			if (latestMsg.sid !== messageId) {
				console.log('NEW MESSAGE ARRIVED');
				console.log(latestMsg.body);
				messageId = latestMsg.sid;

				var result = processRequest(latestMsg.body, latestMsg.from);

			} else {
				// console.log('No new messages ... ...');
			}
		} 
		else {
			if (latestMsg.sid !== messageId) {
				console.log('Unregistered user ... !', latestMsg.from);
			} 
			else{
				// console.log('No new messages ... ...');
			}
		}
	}

	function process (req, res, next) {
		var messageId = '',
			latestMsg;

		setInterval (function () {
			client.messages.list({    
			}, function(err, data) { 
				latestMsg = findLatestMsg(data.messages);
				verifyMessage(latestMsg);
			});
		}, 1000);
		next();
	} 

    server.get('/sms', process, function (req, res) {
        var model = { name: 'wfm' };
        
        res.render('index', model);
        
    });

};
