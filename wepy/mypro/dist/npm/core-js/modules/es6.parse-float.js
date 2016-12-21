var $export     = require('./_export.js')
  , $parseFloat = require('./_parse-float.js');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});