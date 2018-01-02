//for reference see:
//https://github.com/mindboards/ev3sources/blob/master/lms2012/lms2012/source/bytecodes.h

var PRIMPAR_LABEL = 0x20;
var PRIMPAR_SHORT = 0x00;
var PRIMPAR_CONST = 0x00;
var PRIMPAR_VALUE = 0x3F;

module.exports = {
   opOUTPUT_POWER: 0xA4,
   opOUTPUT_START: 0xA6,

   lc0: function(v) { 
      return ((v & PRIMPAR_VALUE) | PRIMPAR_SHORT | PRIMPAR_CONST);
   }
};