// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export.js')
  , gOPD     = require('./_object-gopd.js').f
  , anObject = require('./_an-object.js');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});