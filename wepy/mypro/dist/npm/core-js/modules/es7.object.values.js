// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export.js')
  , $values = require('./_object-to-array.js')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});