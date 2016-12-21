// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = require('./_export.js')
  , ownKeys        = require('./_own-keys.js')
  , toIObject      = require('./_to-iobject.js')
  , gOPD           = require('./_object-gopd.js')
  , createProperty = require('./_create-property.js');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});