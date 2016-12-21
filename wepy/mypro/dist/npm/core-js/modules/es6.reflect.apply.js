// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = require('./_export.js')
  , aFunction = require('./_a-function.js')
  , anObject  = require('./_an-object.js')
  , rApply    = (require('./_global.js').Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails.js')(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});