// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp.js')
  , defined  = require('./_defined.js');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};