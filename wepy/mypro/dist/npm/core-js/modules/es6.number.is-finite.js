// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export.js')
  , _isFinite = require('./_global.js').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});