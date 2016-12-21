// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor.js');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};