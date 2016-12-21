'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html.js')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});