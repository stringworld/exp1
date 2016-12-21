// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export.js');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});