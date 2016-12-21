'use strict';
var $export     = require('./_export.js')
  , toObject    = require('./_to-object.js')
  , toPrimitive = require('./_to-primitive.js');

$export($export.P + $export.F * require('./_fails.js')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});