'use strict';
var $export = require('./_export.js')
  , $some   = require('./_array-methods.js')(3);

$export($export.P + $export.F * !require('./_strict-method.js')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});