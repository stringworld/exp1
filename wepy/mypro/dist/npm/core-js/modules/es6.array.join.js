'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export.js')
  , toIObject = require('./_to-iobject.js')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject.js') != Object || !require('./_strict-method.js')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});