// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object.js');

require('./_object-sap.js')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});