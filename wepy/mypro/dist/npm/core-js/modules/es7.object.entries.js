// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export.js')
  , $entries = require('./_object-to-array.js')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});