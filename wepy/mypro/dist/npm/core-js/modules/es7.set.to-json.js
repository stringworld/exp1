// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export.js');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json.js')('Set')});