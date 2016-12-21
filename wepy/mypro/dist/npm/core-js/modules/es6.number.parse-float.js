var $export     = require('./_export.js')
  , $parseFloat = require('./_parse-float.js');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});