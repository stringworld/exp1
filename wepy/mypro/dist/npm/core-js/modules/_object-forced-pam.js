// Forced replacement prototype accessors methods
module.exports = require('./_library.js')|| !require('./_fails.js')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global.js')[K];
});