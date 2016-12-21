// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export.js')
  , setProto = require('./_set-proto.js');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});