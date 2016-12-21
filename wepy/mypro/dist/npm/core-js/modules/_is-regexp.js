// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object.js')
  , cof      = require('./_cof.js')
  , MATCH    = require('./_wks.js')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};