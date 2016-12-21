// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export.js')
  , anObject           = require('./_an-object.js')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});