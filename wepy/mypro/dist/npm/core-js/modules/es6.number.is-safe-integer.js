// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export.js')
  , isInteger = require('./_is-integer.js')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});