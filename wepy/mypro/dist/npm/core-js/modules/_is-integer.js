// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object.js')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};