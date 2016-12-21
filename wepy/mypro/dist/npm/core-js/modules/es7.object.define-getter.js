'use strict';
var $export         = require('./_export.js')
  , toObject        = require('./_to-object.js')
  , aFunction       = require('./_a-function.js')
  , $defineProperty = require('./_object-dp.js');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors.js') && $export($export.P + require('./_object-forced-pam.js'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});