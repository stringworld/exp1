// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export.js');

$export($export.P, 'Array', {fill: require('./_array-fill.js')});

require('./_add-to-unscopables.js')('fill');