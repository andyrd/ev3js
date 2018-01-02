var ev3 = require('./ev3.js');
ev3.log.toConsole({level:'debug'});

ev3.connection.connect(null, function() {
   ev3.output.start(null, function(data) {
   });
});