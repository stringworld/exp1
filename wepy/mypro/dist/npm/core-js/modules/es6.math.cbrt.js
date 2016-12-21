// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export.js')
  , sign    = require('./_math-sign.js');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});