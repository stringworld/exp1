'use strict';
var $export                  = require('./_export.js')
  , toObject                 = require('./_to-object.js')
  , toPrimitive              = require('./_to-primitive.js')
  , getPrototypeOf           = require('./_object-gpo.js')
  , getOwnPropertyDescriptor = require('./_object-gopd.js').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors.js') && $export($export.P + require('./_object-forced-pam.js'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});