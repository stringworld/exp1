var $export   = require('./_export.js')
  , $parseInt = require('./_parse-int.js');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});