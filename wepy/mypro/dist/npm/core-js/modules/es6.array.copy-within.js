// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export.js');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within.js')});

require('./_add-to-unscopables.js')('copyWithin');