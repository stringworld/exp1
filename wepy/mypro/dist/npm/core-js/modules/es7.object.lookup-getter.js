'use strict';
var $export                  = require('./_export.js')
  , toObject                 = require('./_to-object.js')
  , toPrimitive              = require('./_to-primitive.js')
  , getPrototypeOf           = require('./_object-gpo.js')
  , getOwnPropertyDescriptor = require('./_object-gopd.js').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors.js') && $export($export.P + require('./_object-forced-pam.js'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});