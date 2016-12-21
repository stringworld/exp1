'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export.js')
  , $includes = require('./_array-includes.js')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables.js')('includes');