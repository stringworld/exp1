// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors.js') && /./g.flags != 'g')require('./_object-dp.js').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags.js')
});