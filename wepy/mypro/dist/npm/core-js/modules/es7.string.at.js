'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export.js')
  , $at     = require('./_string-at.js')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});