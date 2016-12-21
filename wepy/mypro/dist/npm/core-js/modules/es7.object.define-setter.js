'use strict';
var $export         = require('./_export.js')
  , toObject        = require('./_to-object.js')
  , aFunction       = require('./_a-function.js')
  , $defineProperty = require('./_object-dp.js');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors.js') && $export($export.P + require('./_object-forced-pam.js'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});