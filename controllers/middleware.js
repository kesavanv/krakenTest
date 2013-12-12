var spawn = require('child_process').spawn,
    case1 = spawn('java', ['Echo', 'keen', 'testing', 'one']),
    case2 = spawn('java', ['ReturnValue', '125', '35']);

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
