'use strict';
var $export  = require('./_export.js')
  , $forEach = require('./_array-methods.js')(0)
  , STRICT   = require('./_strict-method.js')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});