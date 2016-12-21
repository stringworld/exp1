'use strict';
var global      = require('./_global.js')
  , dP          = require('./_object-dp.js')
  , DESCRIPTORS = require('./_descriptors.js')
  , SPECIES     = require('./_wks.js')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};