'use strict';
var $export = require('./_export.js')
  , $at     = require('./_string-at.js')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});