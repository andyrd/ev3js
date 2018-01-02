var winston = require('winston');

var toConsoleEnabled = false;
var toFileEnabled = false;

module.exports.debug = function(log) {
   if(toConsoleEnabled || toFileEnabled) winston.debug(log);
};

module.exports.info = function(log) {
   if(toConsoleEnabled || toFileEnabled) winston.info(log);
};

module.exports.warn = function(log) {
   if(toConsoleEnabled || toFileEnabled) winston.warn(log);
};

module.exports.error = function(log) {
   if(toConsoleEnabled || toFileEnabled) winston.error(log);
};

module.exports.toConsole = function(options) {
   if(!toConsoleEnabled)
   {
      winston.remove(winston.transports.Console);

      winston.add(winston.transports.Console, {
         level: options && options.level || 'info', 
         timestamp: true
      });

      toConsoleEnabled = true;
   }
};

module.exports.toFile = function(options) {
   if(!toFileEnabled)
   {
      winston.add(winston.transports.File, {
         level: options && options.level || 'info', 
         timestamp: true, 
         filename: options && options.fileName || 'ev3.log' 
      });

      toFileEnabled = true;
   }
};