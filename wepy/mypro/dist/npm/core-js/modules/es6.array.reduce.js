'use strict';
var $export = require('./_export.js')
  , $reduce = require('./_array-reduce.js');

$export($export.P + $export.F * !require('./_strict-method.js')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});