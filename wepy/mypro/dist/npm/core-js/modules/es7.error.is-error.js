// https://github.com/ljharb/proposal-is-error
var $export = require('./_export.js')
  , cof     = require('./_cof.js');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});