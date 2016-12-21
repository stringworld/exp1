// 20.2.2.21 Math.log10(x)
var $export = require('./_export.js');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});