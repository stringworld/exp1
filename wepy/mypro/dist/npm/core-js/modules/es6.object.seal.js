// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object.js')
  , meta     = require('./_meta.js').onFreeze;

require('./_object-sap.js')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});