'use strict';

var twilio = require('twilio'),
	config = require('nconf'),
	client = new twilio.RestClient(config.get('accountSid'), config.get('authToken')),
	fs = require('fs'),
	_=require('underscore'),
	S = require('string'),
	JavaMiddleware = require('./javaMiddleware');


module.exports = function (server) {

	var appData = JSON.parse(fs.readFileSync('./public/data/temp.json', 'utf8')),
		whitelist = appData.whitelist,
		messageId = '';

    function replyBack (message, recipient) {
        client.messages.create({  
            to: '+919840224594',
            from: '+12024996569', 
            body: message, 
        }, function(err, message) { 
            console.log(message.sid); 
        });
    }

	function processRequest (message, sender) {
		var parsedMessage = S(message).parseCSV(' ', null),
			command = parsedMessage[0].toUpperCase(),
			helpMsg = '\nsend\nBUILD <streamName>\nDEPLOY <BuildId> <lab>\n',
			javaMiddleware = new JavaMiddleware();

		switch (command) {
		case 'HELP':
			console.log('send HELP');
			replyBack(helpMsg, sender);
			break;

		case 'BUILD':
			var streamName = parsedMessage[1];
			console.log('initiate Build stream: ', streamName);
			// javaMiddleware.buildStream(streamName);
			// replyBack('your Build is intiated', sender);
			break;

		case 'DEPLOY':
			var buildId = parsedMessage[1],
				lab = parsedMessage[2];
			console.log('Deploy Buildid: ', buildId, 'in the lab: ', lab);
			// javaMiddleware.deployBuild(buildId, lab);
			// replyBack('build deployment intiated', sender);
			break;

		default:
			console.log('Not a valid COMMAND, show HELP');
			var invalidReply = '\nInvalid Command' + helpMsg;
			replyBack(invalidReply, sender);
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

	function validate (messageList) {
		var latestMsg = findLatestMsg(messageList);

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
		setInterval (function () {
			client.messages.list({    
			}, function(err, data) { 
				validate(data.messages);
			});
		}, 1000);
		next();
	} 

    server.get('/sms', process, function (req, res) {
        var model = { name: 'wfm' };
        res.render('index', model);
        
    });

};
