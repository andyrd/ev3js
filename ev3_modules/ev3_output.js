//for reference see:
//https://github.com/mindboards/ev3sources/blob/master/lms2012/c_com/source/c_com.h
//https://github.com/mindboards/ev3sources/blob/master/lms2012/c_output/source/c_output.c

var connection = ev3Require('/common/ev3_connection');
var log = ev3Require('/common/ev3_log');
var connection = ev3Require('/common/ev3_connection');
var bytecodes = ev3Require('/ev3_modules/ev3_bytecodes');

//Bit field representing output 1 to 4
var NOS = {A: 0x01, B: 0x02, C: 0x04, D: 0x08 };

//USB chain layer (master = 0, slave = 1); hard coded for now
var LAYER = 0;

var messageCounter = 0x00;

var lc0 = bytecodes.lc0;

module.exports.outputs = NOS;

//Direct command format
//byte 0 - 1: command size
//byte 2 - 3: message counter
//byte 4    : reply required
//byte 5 - 6: number of global and local variables
//byte 7 - n: byte codes

module.exports.start = function(args, callback) {
   var power = args && args.power || 100;
   var nos = args && args.outputs || 0x0F;
   var replyRequired = callback ? 0x00 : 0x80;

   var message = [
      messageCounter, 0x00, 
      replyRequired, 
      0x00, 0x00,
      bytecodes.opOUTPUT_POWER, lc0(LAYER), lc0(nos), lc0(power),
      bytecodes.opOUTPUT_START, lc0(LAYER), lc0(nos)
   ];
   
   var messageLength = message.length;

   message.unshift(0x00);
   message.unshift(messageLength);

   var buffer = new Buffer(message);

   log.debug('sending: ' + buffer.toString('hex'));

   connection.write(buffer, function(err, result) {
      if(err)
      {
         log.error('write error: ' + err);
      }
      else
      {
         if(callback)
         {
            connection.read(function(data) {
               log.debug('reading: ' + data.toString('hex'));
               callback(data);
            });
         }
      }
   });
};

module.exports.stop = function(args, callback) {

};