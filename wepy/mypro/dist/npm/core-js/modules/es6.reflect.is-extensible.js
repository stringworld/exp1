// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export.js')
  , anObject      = require('./_an-object.js')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});