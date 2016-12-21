// 20.2.2.34 Math.trunc(x)
var $export = require('./_export.js');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});