var TO_PRIMITIVE = require('./_wks.js')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide.js')(proto, TO_PRIMITIVE, require('./_date-to-primitive.js'));