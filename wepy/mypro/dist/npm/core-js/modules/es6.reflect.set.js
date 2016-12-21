// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp.js')
  , gOPD           = require('./_object-gopd.js')
  , getPrototypeOf = require('./_object-gpo.js')
  , has            = require('./_has.js')
  , $export        = require('./_export.js')
  , createDesc     = require('./_property-desc.js')
  , anObject       = require('./_an-object.js')
  , isObject       = require('./_is-object.js');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});