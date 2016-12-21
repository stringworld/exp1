// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export.js')
  , getProto = require('./_object-gpo.js')
  , anObject = require('./_an-object.js');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});