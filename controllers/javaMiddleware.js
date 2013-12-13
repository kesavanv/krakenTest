'use strict';
//var java = require("java");
var spawn = require('child_process').spawn;

var JavaMiddleware = function () {};

JavaMiddleware.prototype = {
    buildStream: function (fusionJob, streamName){
        var result,
            case1 = spawn('java', ['TestPreemptive', fusionJob, 'build', streamName], { cwd: undefined,
  env: {CLASSPATH: '/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/fluent-hc-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpcore-4.2.4.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/commons-codec-1.6.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpclient-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpmime-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/commons-logging-1.1.1.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpclient-cache-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/'}}
);

        case1.stdout.on('data', function (data) {
            console.log(data.length);
            console.log('stdout: \n' + data);
            result = data;
        });

        case1.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
            result = data;
        });

        case1.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });

        return result;

    },

    deployBuild: function (fusionJob, streamName, labName) {
        var result,
            case2 = spawn('java', ['TestPreemptive', fusionJob, 'deploy', streamName, labName], { cwd: undefined,
  env: {CLASSPATH: '/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/fluent-hc-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpcore-4.2.4.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/commons-codec-1.6.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpclient-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpmime-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/commons-logging-1.1.1.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/httpclient-cache-4.2.5.jar:/Users/kvaratharajan/Documents/Githome/Playground/hackathon/WFM/controllers/'}});

        case2.stdout.on('data', function (data) {
            console.log(data.length);
            console.log('stdout: \n' + data);
            result = data;
        });

        case2.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
            result = data;
        });

        case2.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });

        return result;
    }
};

module.exports = JavaMiddleware;

