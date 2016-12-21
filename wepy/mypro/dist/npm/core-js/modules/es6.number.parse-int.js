var $export   = require('./_export.js')
  , $parseInt = require('./_parse-int.js');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});