'use strict';
var $export = require('./_export.js')
  , $filter = require('./_array-methods.js')(2);

$export($export.P + $export.F * !require('./_strict-method.js')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});