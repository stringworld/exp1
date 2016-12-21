// 20.2.2.14 Math.expm1(x)
var $export = require('./_export.js')
  , $expm1  = require('./_math-expm1.js');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});