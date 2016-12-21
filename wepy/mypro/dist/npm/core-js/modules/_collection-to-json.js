// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof.js')
  , from    = require('./_array-from-iterable.js');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};