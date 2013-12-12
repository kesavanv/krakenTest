'use strict';

var spawn = require('child_process').spawn;

var JavaMiddleware = function () {};

JavaMiddleware.prototype = {
    buildStream: function (streamName) {
        var case1 = spawn('java', ['Echo', streamName]);

        case1.stdout.on('data', function (data) {
            console.log(data.length);
            console.log('stdout: \n' + data);
        });

        case1.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        case1.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });

    },

    deployBuild: function (buildId, lab) {
        var  case2 = spawn('java', ['ReturnValue', buildId, lab]);

        case2.stdout.on('data', function (data) {
            console.log(data.length);
            console.log('stdout: \n' + data);
        });

        case2.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        case2.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    }
};

module.exports = JavaMiddleware;

