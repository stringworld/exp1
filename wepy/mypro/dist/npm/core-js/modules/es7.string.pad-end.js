'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export.js')
  , $pad    = require('./_string-pad.js');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});