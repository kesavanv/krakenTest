'use strict';
//var java = require("java");
var spawn = require('child_process').spawn;

var JavaMiddleware = function () {};

JavaMiddleware.prototype = {
    buildStream: function (streamName){
        var case1 = spawn('java', ['TestPreemptive'], { cwd: undefined,
  env: {CLASSPATH: '/Users/sbalamurugan/Documents/WFM/controllers/fluent-hc-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpcore-4.2.4.jar:/Users/sbalamurugan/Documents/WFM/controllers/commons-codec-1.6.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpclient-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpmime-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/commons-logging-1.1.1.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpclient-cache-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/'}}
);

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

    }(1234),

    deployBuild: function (fusionjob, deploy, stream, lab) {
        var  case2 = spawn('java', ['TestPreemptive', fusionjob, deploy, stream, lab], { cwd: undefined,
  env: {CLASSPATH: '/Users/sbalamurugan/Documents/WFM/controllers/fluent-hc-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpcore-4.2.4.jar:/Users/sbalamurugan/Documents/WFM/controllers/commons-codec-1.6.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpclient-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpmime-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/commons-logging-1.1.1.jar:/Users/sbalamurugan/Documents/WFM/controllers/httpclient-cache-4.2.5.jar:/Users/sbalamurugan/Documents/WFM/controllers/'}});

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
    }('mohan_deploy', 'deploy', 'PF-ISO-109_int', 'vpslab052_l')
};

module.exports = JavaMiddleware;

