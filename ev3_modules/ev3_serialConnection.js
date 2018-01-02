var SerialPort = require("serialport").SerialPort;
var connection = ev3Require('/common/ev3_connection');
var log = ev3Require('/common/ev3_log');

module.exports.connect = function(args, callback) {
   var device   = args && args.device   || '/dev/rfcomm0';
   var baudrate = args && args.baudrate || 9600;
   var databits = args && args.databits || 8;
   var stopbits = args && args.stopbits || 1;
   var parity   = args && args.parity   || 'none';
   
   if(connection._serialPort)
   {
      log.warn('connection already established');
   }
   else
   {
      connection._serialPort = new SerialPort(device, {
         baudrate: baudrate,
         databits: databits,
         stopbits: stopbits,
         parity: parity
      });

      connection._serialPort.once('open', function() {
         log.info('port opened on ' + device);

         connection.write = function(data, writeCallback) {
            connection._serialPort.write(data, function(err, results) {
               if(writeCallback) writeCallback(err, results);
            });
         };

         connection.read = function(onDataCallback) {
            connection._serialPort.once('data', function(data) {
               if(onDataCallback) onDataCallback(data);
            });
         };

         if(callback) callback();
      });
   }
};

module.exports.disconnect = function(args, callback) {
   if(!connection._serialPort)
   {
      log.warn('connection not open');
   }
   else
   {
      connection._serialPort.close();
      log.info('connection closed');
      if(callback) callback();
   }
};