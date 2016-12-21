'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof.js')
  , test    = {};
test[require('./_wks.js')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine.js')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}