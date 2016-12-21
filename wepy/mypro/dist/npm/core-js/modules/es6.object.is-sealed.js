// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object.js');

require('./_object-sap.js')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});