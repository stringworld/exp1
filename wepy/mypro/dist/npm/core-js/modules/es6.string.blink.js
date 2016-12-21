'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html.js')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});