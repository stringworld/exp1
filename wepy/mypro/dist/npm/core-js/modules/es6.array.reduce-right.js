'use strict';
var $export = require('./_export.js')
  , $reduce = require('./_array-reduce.js');

$export($export.P + $export.F * !require('./_strict-method.js')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});