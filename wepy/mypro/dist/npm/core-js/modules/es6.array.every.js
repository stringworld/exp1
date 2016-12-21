'use strict';
var $export = require('./_export.js')
  , $every  = require('./_array-methods.js')(4);

$export($export.P + $export.F * !require('./_strict-method.js')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});