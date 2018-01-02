require('./ev3_projRequire');
var log = ev3Require('/common/ev3_log');
var events = ev3Require('/common/ev3_events');
var connection = ev3Require('/ev3_modules/ev3_serialConnection');
var output = ev3Require('/ev3_modules/ev3_output');

module.exports.log = log;
module.exports.events = events;
module.exports.connection = connection;
module.exports.output = output;